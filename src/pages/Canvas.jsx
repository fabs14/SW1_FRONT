import { useRef, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import axios from 'axios';
import { socket } from '../services/sokcet';

export default function Workspace() {
  const { id } = useParams();
  const editorRef = useRef(null);
  const socketRef = useRef(socket);
  const mySocketIdRef = useRef("");
  const remoteApplyRef = useRef(false);

  const [pagesList, setPagesList] = useState([{ id: 'page-1', name: 'Inicio', data: null }]);
  const [selectedPageId, setSelectedPageId] = useState('page-1');
  const [editingPageName, setEditingPageName] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('Proyecto');

  // ✅ Emitir editorUpdate con useCallback
  const emitEditorUpdate = useCallback(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getEditor();
    if (!editor) return;

    socketRef.current.emit('editorUpdate', {
      socketId: mySocketIdRef.current,
      projectId: id,
      html: editor.getHtml(),
      css: editor.getCss(),
    });
  }, [id]);

  // 🔄 Emitir actualización de páginas
  const emitirPagesUpdate = useCallback((pages, selectedId = selectedPageId) => {
    socketRef.current.emit('pagesUpdate', {
      socketId: mySocketIdRef.current,
      projectId: id,
      pages,
      selectedPageId: selectedId
    });
  }, [id, selectedPageId]);

  // ⚡ Conexión Socket
  useEffect(() => {
    if (!id) return;
  
    const sock = socket;
    socketRef.current = sock;
  
    sock.connect();
  
    sock.on('connect', () => {
      mySocketIdRef.current = sock.id;
      sock.emit('joinProject', id);
    });
  
    sock.on('editorUpdate', (snap) => {
      if (snap.projectId !== id || snap.socketId === mySocketIdRef.current) return;
      const editor = editorRef.current?.getEditor();
      if (!editor) return;
      remoteApplyRef.current = true;
      editor.setComponents(snap.html);
      editor.setStyle(snap.css);
    });
  
    sock.on('pagesUpdate', ({ socketId, pages, selectedPageId: remoteSelected }) => {
      if (socketId === mySocketIdRef.current) return;
      setPagesList(pages);
      setSelectedPageId(remoteSelected);
      const page = pages.find(p => p.id === remoteSelected);
      if (editorRef.current && page?.data) {
        editorRef.current.loadProjectData(page.data);
      }
    });
  
    // ✅ solucion: usar una variable local para cleanup
    const socketCleanup = sock;
  
    return () => {
      socketCleanup.off('editorUpdate');
      socketCleanup.off('pagesUpdate');
      socketCleanup.disconnect();
    };
  }, [id]);
  

  useEffect(() => {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;

    const updateHandler = () => {
      if (remoteApplyRef.current) {
        remoteApplyRef.current = false;
        return;
      }
      emitEditorUpdate();
    };

    editor.on('update', updateHandler);

    return () => {
      editor.off('update', updateHandler);
    };
  }, [emitEditorUpdate]);

  // 📦 Cargar proyecto
  useEffect(() => {
    const cargarProyecto = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://sw1node-production.up.railway.app/api/proyectos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { data, nombre_proyecto } = response.data;
        setNombreProyecto(nombre_proyecto);

        if (editorRef.current && data?.pages) {
          setPagesList(data.pages);
          setSelectedPageId(data.pages[0]?.id || 'page-1');
          editorRef.current.loadProjectData(data.pages[0]?.data || {});
        } else {
          setPagesList([{ id: 'page-1', name: 'Inicio', data: null }]);
          editorRef.current.loadProjectData({});
        }
      } catch (error) {
        console.error('❌ Error cargando proyecto:', error);
      }
    };

    cargarProyecto();
  }, [id]);

  // 💾 Autoguardado
  useEffect(() => {
    const interval = setInterval(() => {
      if (!editorRef.current) return;

      const currentData = editorRef.current.getProjectData();
      const updatedPages = pagesList.map((p) =>
        p.id === selectedPageId ? { ...p, data: currentData } : p
      );

      setPagesList(updatedPages);

      const token = localStorage.getItem('token');
      axios.put(`https://sw1node-production.up.railway.app/api/proyectos/${id}`, {
        nombre_proyecto: nombreProyecto,
        data: { pages: updatedPages },
        tipo_proyecto_id: "e59857c6-3be5-4692-9e31-2c07004a8348",
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        console.log("💾 Autoguardado");
      }).catch((err) => {
        console.error("❌ Error autoguardando:", err);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [pagesList, selectedPageId, nombreProyecto, id]);

  // Página activa
  const handlePageChange = (e) => {
    const newPageId = e.target.value;
    const currentData = editorRef.current.getProjectData();

    const updated = pagesList.map((p) =>
      p.id === selectedPageId ? { ...p, data: currentData } : p
    );

    setPagesList(updated);
    setSelectedPageId(newPageId);

    const newPage = updated.find((p) => p.id === newPageId);
    if (newPage?.data) {
      editorRef.current.loadProjectData(newPage.data);
    } else {
      editorRef.current.loadProjectData({});
    }

    emitirPagesUpdate(updated, newPageId);
  };

  const handlePageNameChange = (e) => setEditingPageName(e.target.value);

  const savePageName = () => {
    const updated = pagesList.map((p) =>
      p.id === selectedPageId ? { ...p, name: editingPageName } : p
    );
    setPagesList(updated);
    setEditingPageName('');
    emitirPagesUpdate(updated);
  };

  const createNewPage = () => {
    const newId = `page-${Date.now()}`;
    const newPage = { id: newId, name: `Nueva página ${pagesList.length + 1}`, data: null };
    const updated = [...pagesList, newPage];

    setPagesList(updated);
    setSelectedPageId(newId);
    editorRef.current.loadProjectData({});
    emitirPagesUpdate(updated, newId);
  };

  const exportarProyecto = async () => {
    try {
      const token = localStorage.getItem('token');
      const pagesFormatted = [];

      for (const page of pagesList) {
        if (page.data) {
          editorRef.current.loadProjectData(page.data);
          await new Promise((resolve) => setTimeout(resolve, 200));

          pagesFormatted.push({
            id: page.id,
            name: page.name,
            html: editorRef.current.getHtml(),
            css: editorRef.current.getCss()
          });
        }
      }

      const response = await axios.post('https://sw1node-production.up.railway.app/api/export-angular', {
        pages: pagesFormatted
      }, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
      });

      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'angular_project.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('❌ Error exportando proyecto:', error);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        toggleSidebar={() => {}} 
        guardarCambios={() => {}} 
        exportAllPages={exportarProyecto} 
      />
      <div style={{ flex: 1, display: 'flex' }}>
        <Sidebar
          pagesList={pagesList}
          selectedPageId={selectedPageId}
          editingPageName={editingPageName}
          handlePageChange={handlePageChange}
          handlePageNameChange={handlePageNameChange}
          savePageName={savePageName}
          createNewPage={createNewPage}
          exportAllPages={exportarProyecto}
        />
        <div style={{ flex: 1 }}>
          <Editor ref={editorRef} />
        </div>
      </div>
    </div>
  );
}
