import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreator } from './store';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList,
} from './style';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getListArea = () => {
    const { focused, hotList } = this.props;
    if (focused) {
      return (
        <SearchInfo>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch>换一批</SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {hotList.map((item, index) => (
              <SearchInfoItem key={index}>{item}</SearchInfoItem>
            ))}
          </SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  };

  render() {
    const { focused, handleInputBlur, handleInputFocus } = this.props;
    return (
      <HeaderWrapper>
        <Logo />
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          <NavItem className='right'>登录</NavItem>
          <NavItem className='right'>
            <i className='iconfont'>&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition in={focused} timeout={500} classNames='slide'>
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <i className={focused ? 'focused iconfont' : 'iconfont'}>
              &#xe614;
            </i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className='reg'>注册</Button>
          <Button className='writting'>
            <i className='iconfont'>&#xe708;</i>写文章
          </Button>
        </Addition>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused'),
    focused: state.getIn(['header', 'focused']),
    hotList: state.getIn(['header', 'hotList']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      const hotWordsAction = actionCreator.getHotList();
      dispatch(hotWordsAction);
      const focusAction = actionCreator.searchFocus();
      dispatch(focusAction);
    },
    handleInputBlur() {
      const action = actionCreator.searchBlur();
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
