

type SchemaBuilderOptions = {
	baseUrl?: string;
};

type BuildFnOptions = { query?: SearchParams, hash?: string };
type BuildFn = (options?: BuildFnOptions) => string;
type Builder<Param, Return> = (p: Param) => Return;
export type WithBuild<T> = T & { build: BuildFn };

export type SearchParams = { [key: string]: string | undefined };

export const schemaBuilder = function (options?: SchemaBuilderOptions) {
	const urlPath: Array<string | undefined> = [options ? options.baseUrl : undefined];

	const build: BuildFn = (options: BuildFnOptions = {}) => {

		const {
			query,
			hash
		} = options;

		function buildSearchParams(params: SearchParams) {
			return Object
				.entries(params)
				.filter(([, val]) => Boolean(val))
				.map(([key, val]) => `${key}=${val}`)
				.join('&');
		}

		const urlParts: [string, string | undefined, string | undefined] = [
			urlPath.join('/'),
			query ? `?${buildSearchParams(query)}` : undefined,
			hash ? `#${hash}` : undefined
		];

		return urlParts.join('');
	};

	function path<Sub>(name: string, next: () => Sub): Builder<void, Sub> {
		return () => {
			urlPath.push(name);
			return { ...next() };
		};
	}

	function param<P extends string, Sub>(next: () => Sub): Builder<P, Sub> {
		return (pathParam: P) => {
			urlPath.push(pathParam);
			return { ...next() };
		};
	}

	function endpoint<T>(sub: T): () => WithBuild<T> {
		return () => ({
			...sub,
			build,
		});
	}

	return {
		endpoint,
		param,
		path,
	};
};
