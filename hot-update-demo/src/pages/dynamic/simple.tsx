import { createRemotePage } from '../mini-hot/createRemotePage'

/**
 * 简单用法
 */
export default createRemotePage(async () => {
    const RemotePage = (await import('./RemotePage')).default
    return RemotePage
})
