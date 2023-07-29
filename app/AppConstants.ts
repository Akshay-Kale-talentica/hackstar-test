export const METHOD_NOT_ALLOWED = 'Method not allowed';
export const INTERNAL_SERVER_ERROR = 'Internal server error';
export const RequestMethods = {
  Post: 'POST',
  Put: 'PUT',
  Get: 'GET',
  Delete: 'DELETE',
  Patch: 'PATCH',
};
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
