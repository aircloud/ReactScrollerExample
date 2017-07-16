/**
 * Created by Xiaotao.Nie on 2017/3/13.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {getAllClass,updateInfo} from '../../actions/index.action';
import { Link } from 'react-router';
import "./HomePage.less";

import ReactScoller from "reactscroller";

@connect(state => {
    return {
        Info:state.rootReducer.getInfo.info
    };
}, {
    getAllClass,updateInfo
})
class HomePage extends Component{

    constructor(props) {
        super(props);
        let arr = [];

        for(let i = 0 ; i < 50 ; i++){
            arr.push(i);
        }

        this.state = {
            content:arr,
            showRefresh:false,
            refreshTip:"下拉刷新",
            loadMoreTip:"正在加载...",
            showLoadMore:false
        };

    }

    refresh = () => {

        let that = this;
        setTimeout(()=>{
            let arr = that.state.content;
            for(let i = 0;i<10;i++){
                arr.unshift(arr[i]-1-i);
            }
            that.setState({
                content:arr,
                showRefresh:false,
                refreshTip:"下拉刷新",
            });
        },1400);

    };

    loadmore = () => {
        let that = this;
        setTimeout(()=>{
            let arr = that.state.content;
            let len = arr.length;
            for(let i = arr[len-1];i<(10+arr[len-1]);i++){
                arr.push(i+1);
            }
            that.setState({
                content:arr,
                showLoadMore:false
            });
        },1000);
    };

    changeInfo = () => {
        this.props.updateInfo({
            info:"Then info is changed"
        });
    };

    render(){
        return(
            <div className="HomeLayout">
                <h2>ReactScroller</h2>
                <ReactScoller
                    containerHeight={document.documentElement.clientHeight-100}
                    refresh={()=>{this.setState({showRefresh:true,refreshTip:"正在更新"});this.refresh.bind(this)();}}
                    loadmore={()=>{this.setState({showLoadMore:true,});this.loadmore.bind(this)();}}
                    showRefreshTip={()=>{
                        this.setState({
                            refreshTip:"释放立即刷新"
                        });}
                    }
                    refreshTip={this.state.refreshTip}
                    loadMoreTip={this.state.loadMoreTip}
                    showRefresh={this.state.showRefresh}
                    showLoadMore={this.state.showLoadMore}
                >
                    {this.state.content.map((item,index)=>{
                        if(!(index%10)){
                            return(
                                <div className="listItem tenth" key={index}>{item}</div>
                            )
                        }
                        else{
                            return(
                                <div className="listItem" key={index}>{item}</div>
                            )
                        }
                    })}
                </ReactScoller>
            </div>
        )
    }
}

export default HomePage;
