import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    label {
        display: flex;
        flex-direction: column;
    }

    label {
        color: #343a40;
        font-weight: 500;
        margin: 1em 0;
    }
    input {
        width: 300px;
        padding: 1em;
        border: 1px solid #dee2e6;
    }
    button {
        outline: none;
        border: 1px solid #ced4da;
        cursor: pointer;
        border-radius: 5px;
    }
    .select {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 5px 0 1em 0;
        button {
            background-color: #ced4da;
            padding: 5px 10px;
            font-weight: 600;
            color: #495057;
            font-size: 0.8em;
            margin: 0 5px;
        }
        .active {
            background-color: #a2d2ff;
            color: #fff;
        }
    }
    .formBottom {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 1em 0;
        button {
            padding: 10px 40px;
            font-weight: 700;
            font-size: 1.1em;
            margin: 0 5px;
        }
    }
    #saveBtn {
        background-color: #43aa8b;
        color: #fff;
    }
    @media screen and (max-width: 992px) {
        width: 100vw;
    }
`;
const CalculatorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media screen and (max-width: 992px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`;
const Results = styled.div`
    margin-left: 15px;
    background-color: #bde0fe;

    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .pair {
        display: flex;
        flex-direction: column;
        padding: 15px;
        min-width: 200px;
    }
    .name {
        color: #343a40;
        font-weight: 500;
    }
    .value {
        font-weight: bold;
        font-size: 1.5em;
        color: #495057;
    }
    @media screen and (max-width: 992px) {
        margin: 0;
        .pair {
            padding: 5px;
        }
        .row {
            width: 100vw;
        }
    }
`;

const numberWithSpaces = (num) => {
    if (isNaN(num)) return 0;

    return num.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
};

const stringToNum = (str) => {
    if (typeof str === 'number') return str;
    return parseInt(str.replace(/\s+/g, ''));
};

const Calculator = () => {
    const [propertyPrice, setPropertyPrice] = useState(
        localStorage.getItem('propertyPrice') || 0
    );
    const [initialFee, setInitialFee] = useState(
        localStorage.getItem('initialFee') || 0
    );
    const [creditTerm, setCreditTerm] = useState(
        localStorage.getItem('creditTerm') || 0
    );
    const [interestRate, setInterestRate] = useState(
        localStorage.getItem('interestRate') || 0
    );

    const loanBody = Math.round(propertyPrice - initialFee);
    // prettier-ignore
    const monthlyPayment = Math.round(loanBody * (interestRate / 1200 + (interestRate / 1200/(Math.pow((1 + (interestRate / 1200)),(creditTerm*12)) - 1))));
    const income = Math.round(5 * (monthlyPayment / 3));
    const overpayment = Math.round(
        -(propertyPrice - monthlyPayment * creditTerm * 12)
    );

    return (
        <CalculatorContainer>
            <Form>
                <label>
                    Стоимость недвижимости, ₽
                    <input
                        name="propertyPrice"
                        type="text"
                        value={numberWithSpaces(propertyPrice)}
                        onChange={(e) => {
                            setPropertyPrice(
                                stringToNum(stringToNum(e.target.value))
                            );
                        }}
                        pattern="^[0-9\s]*$"
                    />
                </label>

                <label>
                    Первоначальный взнос, ₽
                    <input
                        name="initialFee"
                        type="text"
                        value={numberWithSpaces(initialFee)}
                        onChange={(e) =>
                            setInitialFee(stringToNum(e.target.value))
                        }
                        pattern="^[0-9\s]*$"
                        placeholder="₽"
                    />
                </label>
                <div className="select">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setInitialFee(0.1 * propertyPrice);
                        }}
                        className={
                            initialFee / propertyPrice === 0.1 ? 'active' : null
                        }
                    >
                        10%
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setInitialFee(0.15 * propertyPrice);
                        }}
                        className={
                            initialFee / propertyPrice === 0.15
                                ? 'active'
                                : null
                        }
                    >
                        15%
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setInitialFee(0.2 * propertyPrice);
                        }}
                        className={
                            initialFee / propertyPrice === 0.2 ? 'active' : null
                        }
                    >
                        20%
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setInitialFee(0.25 * propertyPrice);
                        }}
                        className={
                            initialFee / propertyPrice === 0.25
                                ? 'active'
                                : null
                        }
                    >
                        25%
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setInitialFee(0.3 * propertyPrice);
                        }}
                        className={
                            initialFee / propertyPrice === 0.3 ? 'active' : null
                        }
                    >
                        30%
                    </button>
                </div>

                <label>
                    Срок кредита, лет
                    <input
                        name="creditTerm"
                        type="text"
                        value={numberWithSpaces(creditTerm)}
                        onChange={(e) =>
                            setCreditTerm(stringToNum(e.target.value))
                        }
                        pattern="^[0-9\s]*$"
                    />
                </label>

                <label>
                    Процентная ставка, %
                    <input
                        name="interestRate"
                        type="text"
                        value={numberWithSpaces(interestRate)}
                        onChange={(e) =>
                            setInterestRate(stringToNum(e.target.value))
                        }
                        pattern="^[0-9\s]*$"
                    />
                </label>
                <div className="formBottom">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            localStorage.setItem(
                                'propertyPrice',
                                propertyPrice
                            );
                            localStorage.setItem('initialFee', initialFee);
                            localStorage.setItem('creditTerm', creditTerm);
                            localStorage.setItem('interestRate', interestRate);
                        }}
                        id="saveBtn"
                    >
                        Save
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setPropertyPrice(0);
                            setInitialFee(0);
                            setCreditTerm(0);
                            setInterestRate(0);
                        }}
                        id="clearBtn"
                    >
                        Clear
                    </button>
                </div>
            </Form>
            <Results>
                <div className="row">
                    <div className="pair">
                        <span className="name">Ежемесячный платёж</span>
                        <span className="value">
                            {numberWithSpaces(monthlyPayment)} ₽
                        </span>
                    </div>
                    <div className="pair">
                        <span className="name">Необходимый доход</span>
                        <span className="value">
                            {numberWithSpaces(income)} ₽
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="pair">
                        <span className="name">Переплата</span>
                        <span className="value">
                            {numberWithSpaces(overpayment)} ₽
                        </span>
                    </div>
                    <div className="pair">
                        <span className="name">Тело кредита</span>
                        <span className="value">
                            {numberWithSpaces(loanBody)} ₽
                        </span>
                    </div>
                </div>
            </Results>
        </CalculatorContainer>
    );
};

export default Calculator;
