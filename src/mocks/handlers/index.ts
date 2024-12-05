import template from './template';
import login from './login';
import signup from './signup';

export const handlers = [...template, login, ...signup];
