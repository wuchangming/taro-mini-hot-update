import { createRemotePage } from '../mini-hot/createRemotePage'

/**
 * 简单用法
 */
export default createRemotePage(() => import('./RemotePage'))
