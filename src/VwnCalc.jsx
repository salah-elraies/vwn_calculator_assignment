import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import cardImg from "./blueCard.png";
const inputNames = ["vendorVal", "mediaVal", "corpVal", "teamVal"];
const initialState = {
  vendorVal: 0,
  mediaVal: 0,
  corpVal: 0,
  teamVal: 0,
  brex: 0,
  stripe: 0,
  amex: 0,
  unlimited_rewards: 0,
  lifetime_rewards: 0,
  selected_company: "",
  selected_index: 0,
};
const companies = ["brex", "stripe", "amex"];

function VwnCalc() {
  const [sum, setSum] = useState(0);
  const [state, setState] = useState(initialState);

  // change
  const handleChange = (e) => {
    const inputVal = parseFloat(e.target.value);
    setState({ ...state, [e.target.name]: inputVal });

    if (!e.target.value) {
      setSum(0);
    }
  };
  const handleSubmit = (e, selectedCompany) => {
    e.preventDefault();
    if (sum > 0) {
      setState({
        ...state,
        selected_company: companies[selectedCompany],
        selected_index: selectedCompany,
      });
    }
  };
  const handleSelectNext = () => {
    setState({
      ...state,
      selected_company:
        companies[
          state.selected_index === companies.length - 1
            ? 0
            : state.selected_index + 1
        ],
      selected_index:
        state.selected_index < companies.length - 1
          ? state.selected_index + 1
          : 0,
    });
  };
  const handleSelectPrev = () => {
    setState({
      ...state,
      selected_company:
        companies[
          state.selected_index === 0
            ? companies.length - 1
            : state.selected_index - 1
        ],
      selected_index:
        state.selected_index === 0
          ? companies.length - 1
          : state.selected_index - 1,
    });
  };
  useEffect(() => {
    if (!inputNames.find((input) => state[input] === 0 || !state[input])) {
      // when this was up with the handleChange function
      // if (e.target.name === "vendorVal") {
      //   setSum(inputVal + state.mediaVal + state.corpVal + state.teamVal);
      // }
      setSum(state.vendorVal + state.mediaVal + state.corpVal + state.teamVal);
    } else {
      setSum(0);
    }
  }, [state.vendorVal, state.mediaVal, state.corpVal, state.teamVal]);
  useEffect(() => {
    setState({
      ...state,
      brex: sum * 0.3,
      stripe: sum * 2.9,
      amex: sum * 1.3,
      unlimited_rewards: sum * 1.1,
      lifetime_rewards: sum * 1.2,
    });
    return () => setState(initialState);
  }, [sum]);
  return (
    <div className="container" id="calculator_container">
      <h2 className="main_title">Calculate your Rewards</h2>
      <form className="calculat_form" id="calculate_form">
        <div className="form_row">
          <div className="form_label_container">
            <label htmlFor="vendor">Vendor/Bills</label>
          </div>
          <input
            type="number"
            placeholder="Enter a number"
            id="vendor"
            name="vendorVal"
            onChange={handleChange}
          />
        </div>
        <div className="form_row">
          <div className="form_label_container">
            <label htmlFor="media">Media/Ad Spend</label>
          </div>
          <input
            type="number"
            placeholder="Enter a number"
            id="media"
            name="mediaVal"
            onChange={handleChange}
          />
        </div>
        <div className="form_row">
          <div className="form_label_container">
            <label htmlFor="corp">Corp.Spend</label>
          </div>
          <input
            type="number"
            placeholder="Enter a number"
            id="corp"
            name="corpVal"
            onChange={handleChange}
          />
        </div>
        <div className="form_row">
          <div className="form_label_container">
            <label htmlFor="team">Team Project</label>
          </div>
          <input
            type="number"
            placeholder="Enter a number"
            id="team"
            name="teamVal"
            onChange={handleChange}
          />
        </div>
        <div className="submit_btns_container">
          <h4>Compare your Rewards</h4>
          <div className="submit_btns">
            {state.selected_company && (
              <button
                className="list_btn prev_btn"
                onClick={handleSelectPrev}
                type="button"
              >
                <FaAngleLeft />
              </button>
            )}
            <button
              className={`${state.selected_company === "brex" ? "active" : ""}`}
              type="submit"
              id="brex"
              onClick={(e) => handleSubmit(e, 0)}
            >
              Brex
            </button>
            <button
              type="submit"
              id="stripe"
              onClick={(e) => handleSubmit(e, 1)}
              className={`${
                state.selected_company === "stripe" ? "active" : ""
              }`}
            >
              Stripe
            </button>
            <button
              type="submit"
              id="amex"
              className={`${state.selected_company === "amex" ? "active" : ""}`}
              onClick={(e) => handleSubmit(e, 2)}
            >
              Amex
            </button>
            {state.selected_company && (
              <button
                className="list_btn next_btn"
                type="button"
                onClick={handleSelectNext}
              >
                <FaAngleRight />
              </button>
            )}
          </div>
        </div>
      </form>
      <div className="info_container">
        <div className="results_container">
          <div className="result_card_container">
            {state.selected_company && (
              <div className="main_result" id="main_result">
                {`${state.selected_company} business card`}
              </div>
            )}
            <div className="unlimited" id="unlimited">
              Unlimited Rewards
            </div>
            <div className="life_time" id="life_time">
              Lifetime Rewards
            </div>
          </div>

          <img src={cardImg} alt="soup" className="card_img" />
        </div>
        <div className="results_container results_info_container">
          <div className="result_card_container">
            {state.selected_company && (
              <div className="main_result" id="main_result">
                ${`${state[state.selected_company]}`}
              </div>
            )}
            <div className="unlimited" id="unlimited">
              ${state.unlimited_rewards}
            </div>
            <div className="life_time" id="life_time">
              ${state.lifetime_rewards}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VwnCalc;
