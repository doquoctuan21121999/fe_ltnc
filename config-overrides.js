const path = require('path');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@resources': path.resolve(__dirname, 'src/resources'),
            '@images': path.resolve(__dirname, 'src/resources/images'),
            '@strings': path.resolve(__dirname, 'src/resources/strings'),
            '@data-access': path.resolve(__dirname, 'src/data-access'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@redux-store': path.resolve(__dirname, 'src/redux-store'),
            '@actions': path.resolve(__dirname, 'src/redux-store/actions'),
            '@student': path.resolve(__dirname, 'src/sites/student'),
            '@teacher': path.resolve(__dirname, 'src/sites/teacher'),
            '@manager': path.resolve(__dirname, 'src/sites/manager'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@items': path.resolve(__dirname, 'src/items'),
            '@containers': path.resolve(__dirname, 'src/containers'),
            
        },
    };

    return config;
};