import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import get from 'lodash.get';

import { history } from '../../store';
import { Loader } from '../loader';
import { cardLoad } from '../../store/cards';


class _CardDetails extends React.Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const id = get(match, 'params.id');

    this.state = {
      isBeingLoaded: true,
      id,
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleStopPropation = this.handleStopPropation.bind(this);
    this.getCard = this.getCard.bind(this);

    this.getCard(id);
  }

  componentDidUpdate() {
    const nextId = get(this.props, 'match.params.id');

    if (nextId !== this.state.id) {
      this.setState({
        card: null,
        isBeingLoaded: true,
        error: null,
        id: nextId,
      });
      this.getCard(nextId);
    }
  }

  getCard(id) {
    const { cardLoad } = this.props;

    cardLoad(id)
      .then(() => {
        this.setState({
          isBeingLoaded: false,
        });
      });
  }

  handleCloseModal() {
    history.push(`/`);
  }

  handleStopPropation(event) {
    event.stopPropagation();
  }

  render() {
    const { card } = this.props;
    const { isBeingLoaded } = this.state;

    if (isBeingLoaded) {
      return <Loader />;
    }

    return (
      <div className="modal" onClick={ this.handleCloseModal }>
        <div className="modal__container" onClick={ this.handleStopPropation }>
          <div className="modal-close" onClick={ this.handleCloseModal }>
            <i className="fas fa-times"/>
          </div>
          <div className="card-details">
            <div className="card-details__img"><img src={ card.imageUrlHiRes } /></div>
            <div className="card-details__content">
              <div className="card-details__name">{ card.name }</div>
              <div className="card-details__tagline">{ card.supertype }</div>
              <hr className="card-details__line" />
              <div className="card-details__stats">
                <span className="stats">
                  <span className="stats__title">HP:</span>
                  <span>{ card.hp }</span>
                </span>
              </div>
              <div>
                Types:
                <ul style={{ marginTop: `5px`, paddingLeft: `20px` }}>
                  { card.types.map((type, index) => <li key={ `${type}${index}` }>{ type }</li>) }
                </ul>
              </div>
              <div>Subtype: { card.subtype }</div>
              { card.evolvesFrom && (
                <div>Evolves from: { card.evolvesFrom }</div>
              ) }
            </div>
          </div>
          <div style={{ marginTop: `50px` }}>
            Attacks:
            {
              card.attacks.map((attack, index) => (
                <div key={ `${attack.name}${index}` }>
                  <div>{ attack.name }</div>
                  <div>{ attack.text }</div>
                  <div>Damage: { attack.damage }</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

_CardDetails.propTypes = {
  card: PropTypes.object.isRequired,
  cardLoad: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  card: state.cards.data,
});

const mapDispatchToProps = (dispatch) => ({
  cardLoad: (id) => dispatch(cardLoad(id)),
});

const CardDetails = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(_CardDetails);

export { CardDetails };
