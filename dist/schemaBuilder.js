"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaBuilder = function ({ baseUrl }) {
    let urlPath = [baseUrl];
    const build = (searchParams) => {
        if (!searchParams)
            return urlPath.join('/');
        function buildSearchParams(params) {
            return Object
                .entries(params)
                .filter(([, val]) => Boolean(val))
                .map(([key, val]) => `${key}=${val}`)
                .join('&');
        }
        return `${urlPath.join('/')}?${buildSearchParams(searchParams)}`;
    };
    function path(name, next) {
        return () => {
            urlPath.push(name);
            return Object.assign({}, next());
        };
    }
    function param(next) {
        return (pathParam) => {
            urlPath.push(pathParam);
            return Object.assign({}, next());
        };
    }
    function endpoint(sub) {
        return () => (Object.assign({}, sub, { build }));
    }
    return {
        endpoint,
        param,
        path,
    };
};
