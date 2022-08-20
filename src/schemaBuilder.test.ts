import { schemaBuilder } from './schemaBuilder';

describe('testing schemaBuilder hash and query', () => {

    const urlBuilder = () => {
        const {
            endpoint,
            param,
            path,
        } = schemaBuilder();

        return {
            api: path('api', () => ({
                users: path('users', endpoint({
                    userId: param(endpoint({}))
                })),
            })),
        };
    }


    it('should have proper hash', () => {
        const url = urlBuilder().api().users().userId('asd').build({
            query: {
                offset: '20',
                page: '2',
            },
            hash: 'yay'
        });

        expect(url).toEqual('/api/users/asd?offset=20&page=2#yay');
    });

    it('should have only query params', () => {
        const url = urlBuilder().api().users().userId('asd').build({
            query: {
                offset: '20',
                page: '2',
            }
        });

        expect(url).toEqual('/api/users/asd?offset=20&page=2');
    });

    it('should have only hash', () => {
        const url = urlBuilder().api().users().userId('asd').build({
            hash: 'yay'
        });

        expect(url).toEqual('/api/users/asd#yay');
    });
});
