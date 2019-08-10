import { CHANGE_HOME_LIST, ADD_HOME_LIST, TOGGLE_TOP_SHOW } from './actionTypes'
import { fromJS } from 'immutable'
const defaultState = fromJS({
    topicList: [
        // {
        //     id: 1,
        //     title: '社会热点',
        //     imgUrl: 'https://upload.jianshu.io/users/upload_avatars/7290998/f64f5ef0-def0-4b26-beb3-b9d88f060ba0.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180'
        // },
        // {
        //     id: 2,
        //     title: '智障操作',
        //     imgUrl: 'https://upload.jianshu.io/users/upload_avatars/7290998/f64f5ef0-def0-4b26-beb3-b9d88f060ba0.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180'
        // }
    ],
    aticleList: [
        // {
        //     id: 1,
        //     title: '笔记本电池越来越不耐用？用了这一招，续航能力提升3倍！',
        //     imgUrl: 'https://upload-images.jianshu.io/upload_images/15098471-a85ce272bd601d2e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240',
        //     desc: '笔记本电脑的电池使用时间是很多用户都特别关心与注重的问题。当笔记本使用一段时间后，电脑的续航能力明显会下降许多，那么我们就可以通过校准电池的方式...'
        // },
        // {
        //     id: 2,
        //     title: '笔记本电池越来越不耐用？用了这一招，续航能力提升3倍！',
        //     imgUrl: 'https://upload-images.jianshu.io/upload_images/15098471-a85ce272bd601d2e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240',
        //     desc: '笔记本电脑的电池使用时间是很多用户都特别关心与注重的问题。当笔记本使用一段时间后，电脑的续航能力明显会下降许多，那么我们就可以通过校准电池的方式...'
        // },
        // {
        //     id: 3,
        //     title: '笔记本电池越来越不耐用？用了这一招，续航能力提升3倍！',
        //     imgUrl: 'https://upload-images.jianshu.io/upload_images/15098471-a85ce272bd601d2e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240',
        //     desc: '笔记本电脑的电池使用时间是很多用户都特别关心与注重的问题。当笔记本使用一段时间后，电脑的续航能力明显会下降许多，那么我们就可以通过校准电池的方式...'
        // },
        // {
        //     id: 4,
        //     title: '笔记本电池越来越不耐用？用了这一招，续航能力提升3倍！',
        //     imgUrl: 'https://upload-images.jianshu.io/upload_images/15098471-a85ce272bd601d2e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240',
        //     desc: '笔记本电脑的电池使用时间是很多用户都特别关心与注重的问题。当笔记本使用一段时间后，电脑的续航能力明显会下降许多，那么我们就可以通过校准电池的方式...'
        // },
    ],
    articlePage: 1,
    showScroll: false
})

export default (state = defaultState, action) => {
    switch(action.type){
        case CHANGE_HOME_LIST:
            return state.merge({
                topicList: fromJS(action.data.topicList),
                aticleList: fromJS(action.data.aticleList)
            })
        case ADD_HOME_LIST: 
            return state.merge({
                aticleList: state.get('aticleList').concat(fromJS(action.data)),
                articlePage: action.page
            })
        case TOGGLE_TOP_SHOW: 
            return state.set('showScroll', action.show)
        default:
            return state
    }
}