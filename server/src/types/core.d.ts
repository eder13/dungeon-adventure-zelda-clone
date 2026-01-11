export interface BaseController {
    name: string;
}

export type ServerRoute = Omit<ServerRoute, 'handler'> & {
    handler: string;
};
