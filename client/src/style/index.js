const styles = {
    fontStyle: {
        micro: () => `
      font-size: 0.75rem;
      line-height: 16px;
      letter-spacing: -0.005em;
    `,
        small: () => `
      font-size: 0.875rem;
      line-height: 24px;
      letter-spacing: -0.01em;
    `,
        base: () => `
      font-size: 1rem;
      line-height: 24px;
      letter-spacing: -0.01em;
    `,
        medium: () => `
      font-size: 1.125rem;
      line-height: 26px;
      letter-spacing: -0.02em;
    `,
        large: () => `
      font-size: 1.5rem;
      line-height: 28px;
      letter-spacing: -0.01em;
    `,
    },

    color: {
        logo: "#fe1b3d",
        confirm: "#057DCD",
        cancel: "#d50000",
    },

    media: {
        sm: "(max-width: 767px)",
        md: "(min-width : 768px) and (max-width : 1200px)",
        lg: "(min-width: 1201px)",
    },
};

export default styles;
