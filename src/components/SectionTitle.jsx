import { memo } from "react"

const SectionTitle = memo(({ title }) => {
  return (
    <h3
      style={{
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--primary-color)",
        marginBottom: "1rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        position: "relative",
        paddingBottom: "0.5rem",
      }}
    >
      {title}
      <span
        style={{
          content: "",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "40px",
          height: "2px",
          background: "linear-gradient(to right, var(--primary-color), var(--secondary-color))",
          borderRadius: "2px",
        }}
      ></span>
    </h3>
  )
})

SectionTitle.displayName = "SectionTitle"

export default SectionTitle
