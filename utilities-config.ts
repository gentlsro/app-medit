import { config } from './config';

export default extendUtilitiesConfig({
  app: config,
  prisma: {
    useInsensitiveFilter: true,
  },
})