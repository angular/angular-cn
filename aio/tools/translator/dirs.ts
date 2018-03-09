export const dirs = {
  aio: __dirname + '/../../',
  get content(): string {
    return this.aio + 'content/';
  },
  get here(): string {
    return this.aio + 'tools/translator/';
  },
};
