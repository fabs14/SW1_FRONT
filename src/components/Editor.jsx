import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { initializeStyles } from '../utils/editorStyles';

import basicBlocks from 'grapesjs-blocks-basic';
import formsPlugin from 'grapesjs-plugin-forms';
import countdown from 'grapesjs-component-countdown';
import navbar from 'grapesjs-navbar';
import tabs from 'grapesjs-tabs';
import customCode from 'grapesjs-custom-code';
import presetWebpage from 'grapesjs-preset-webpage';

const Editor = forwardRef((props, ref) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useImperativeHandle(ref, () => ({
    getProjectData: () => editorInstance.current?.getProjectData(),
    loadProjectData: (data) => editorInstance.current?.loadProjectData(data),
    getHtml: () => editorInstance.current?.getHtml(),
    getCss: () => editorInstance.current?.getCss(),
    getEditor: () => editorInstance.current,
  }));

  useEffect(() => {
    initializeStyles();

    if (!editorRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: false,
      width: '100%',
      height: '100vh',
      storageManager: false,
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' },
          { name: 'Tablet', width: '768px', widthMedia: '992px' },
          { name: 'Mobile', width: '375px', widthMedia: '576px' },
        ],
      },
      css: `
        body {
          font-family: 'Poppins', sans-serif;
          color: #f8fafc;
          background-color: #2a2a3c;
        }
      `,
      panels: { defaults: [] },
      plugins: [
        basicBlocks,
        formsPlugin,
        countdown,
        navbar,
        tabs,
        customCode,
        presetWebpage,
      ],
      pluginsOpts: {
        'grapesjs-blocks-basic': { flexGrid: true },
        'grapesjs-navbar': {},
      },
    });

    editorInstance.current = editor;

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div ref={editorRef} />
  );
});

Editor.displayName = "Editor";
export default Editor;
