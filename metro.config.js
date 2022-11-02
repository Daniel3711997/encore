module.exports = {
    transformer: {
        minifierPath: 'metro-minify-terser',

        getTransformOptions: async () => ({
            transform: {
                inlineRequires: true,
                experimentalImportSupport: false,
            },
        }),
    },
};
