import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  deleteAUserBook,
  showSelectBookToGiveUpModal,
  setBookIdWanted,
} from '../redux/actions/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './BookItem.css';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const tradeToolTip =
  <Tooltip id='tradeToolTip'>
    Trade for this book.
  </Tooltip>;

const ownershipToolTip =
  <Tooltip id='tradeToolTip'>
    You own this book.
  </Tooltip>;

const deleteToolTip =
  <Tooltip id='tradeToolTip'>
    Delete this book.
  </Tooltip>;

const pendingTradeToolTip =
  <Tooltip id='tradeToolTip'>
    A trade is pending on this book.
  </Tooltip>;

class BookItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookThumbnailClass: 'book-thumbnail-image',
      actionIconClass: 'action-icon action-icon-off',
    };

    this.decideToRenderAButton = this.decideToRenderAButton.bind(this);
    this.decideToRenderDeleteOrTradeButton =
      this.decideToRenderDeleteOrTradeButton.bind(this);
    this.decideToRenderDeleteButtonOrOwnedMsg =
      this.decideToRenderDeleteButtonOrOwnedMsg.bind(this);
    this.handleTradeButtonClick = this.handleTradeButtonClick.bind(this);
    this.handleImageHoverEvent = this.handleImageHoverEvent.bind(this);
    this.handleImageHoverOffEvent = this.handleImageHoverOffEvent.bind(this);
  }

  handleInfoButtonClick(bookInfoUrl) {
    let win = window.open(bookInfoUrl, '_blank');
    win.focus();
  }

  decideToRenderAButton(bookId, bookOwner) {
    // if logged in, return a button
    if (this.props.isLoggedIn) {
      return this.decideToRenderDeleteOrTradeButton(bookId, bookOwner);
    } else {
      return null;
    }
  }

  decideToRenderDeleteOrTradeButton(bookId, bookOwner) {
    // if in MyBooks Component, return delete button
    if (this.props.parentComponent === 'MyBooks') {
      return (
        <OverlayTrigger placement='top' overlay={deleteToolTip}>
          <FontAwesomeIcon
              icon='ban'
              onClick={() => this.props.deleteAUserBook(bookId)}
              className={this.state.actionIconClass}
          />
        </OverlayTrigger>
      );
    } else if (this.props.parentComponent === 'Home') {
      // return trade button if in Home Component
      return this.decideToRenderDeleteButtonOrOwnedMsg(bookId, bookOwner);
    } else {
      return null;
    }
  }

  decideToRenderDeleteButtonOrOwnedMsg(bookId, bookOwner) {
    if (bookOwner === this.props.userId) {
      return (
        <OverlayTrigger placement='top' overlay={ownershipToolTip}>
          <FontAwesomeIcon
              icon='check-circle'
              className={this.state.actionIconClass}
          />
        </OverlayTrigger>
      );
    } else if (this.props.pendingTrades.find(
        (trade) => trade.solicitorBook._id === bookId)) {
      return (
        <OverlayTrigger placement='top' overlay={pendingTradeToolTip}>
          <FontAwesomeIcon
              icon='clock'
              className={this.state.actionIconClass}
          />
        </OverlayTrigger>
      );
    } else {
      return (
        <OverlayTrigger placement='top' overlay={tradeToolTip}>
          <FontAwesomeIcon
              icon='exchange-alt'
              onClick={() => this.handleTradeButtonClick(bookId)}
              className={this.state.actionIconClass}
          />
        </OverlayTrigger>
      );
    }
  }

  handleTradeButtonClick(bookId) {
    this.props.setBookIdWanted(bookId);
    this.props.showSelectBookToGiveUpModal(true);
  }

  handleImageHoverEvent() {
    this.setState({
      bookThumbnailClass: 'book-thumbnail-image book-thumbnail-image-hover',
      actionIconClass: 'action-icon action-icon-on',
    });
  }

  handleImageHoverOffEvent() {
    this.setState({
      bookThumbnailClass: 'book-thumbnail-image',
      actionIconClass: 'action-icon action-icon-off',
    });
  }

  render() {
    return (
      <div
          className='book-item'
          onMouseOver={this.handleImageHoverEvent}
          onMouseOut={this.handleImageHoverOffEvent}
      >
        <img
            className={this.state.bookThumbnailClass}
            src={this.props.book.bookThumbnailUrl}
            alt={'Book cover of ' + this.props.book.bookTitle}
            onClick={
              () => this.handleInfoButtonClick(this.props.book.bookInfoUrl)
            }
        />
        {this.decideToRenderAButton(
            this.props.book._id,
            this.props.book.bookOwner
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userIsLoggedIn,
    userId: state.userInfo.userId,
    toShowSelectBookToGiveUpModal: state.showSelectBookToGiveUpModal,
    pendingTrades: state.pendingTradeList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAUserBook: (bookId) => dispatch(deleteAUserBook(bookId)),
    showSelectBookToGiveUpModal: (bool) =>
      dispatch(showSelectBookToGiveUpModal(bool)),
    setBookIdWanted: (bookId) => dispatch(setBookIdWanted(bookId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
