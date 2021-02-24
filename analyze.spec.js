const {
    standardDeviation,
    sanitizeAmounts,
    roundToTwoDp,
    analysePayments
} = require('./analyze.js')
const test = require('ava')

// Standard Deviation
test('Standard Deviation is correct for set Z', t => {
    t.deepEqual(standardDeviation([1, -2, 2, -2, 1, -1]), 1.57);
})

test('Standard Deviation is correct for set Q', t => {
    t.deepEqual(standardDeviation([1.04, -2.05, 2, 2.6, -1, 1]), 1.63);
})

// Amount Sanitization
test('Amounts santized correctly for string inputs', t => {
    t.deepEqual(sanitizeAmounts([
        {
            "Amount": "10.97",
            "TransactionInformation": "Payment One"
        }
    ]),[
        10.97
    ]);
})

test('Amounts santized correctly with missing amounts', t => {
    t.deepEqual(sanitizeAmounts([
        {
            "Amount": 10.97,
            "TransactionInformation": "Payment One"
        },
        {
            "TransactionInformation": "Payment Two"
        },
        {
            "Amount": 8.63,
            "TransactionInformation": "Payment Three"
        }
    ]),[
        10.97,
        8.63
    ]);
})

test('Amounts santized correctly with missing transaction information', t => {
    t.deepEqual(sanitizeAmounts([
        {
            "Amount": 10.97
        },
        {
            "Amount": 24.56,
        },
        {
            "Amount": 25.95,
        }
    ]),[
        10.97,
        24.56,
        25.95
    ]);
})

// Rounding Tests
test('Decimal is rounded up correctly for set Q+', t => {
    t.deepEqual(roundToTwoDp(1.626), 1.63);
})

test('Decimal is rounded down correctly for set Q+', t => {
    t.deepEqual(roundToTwoDp(2.464), 2.46);
})

test('Decimal is rounded up correctly for set Q-', t => {
    t.deepEqual(roundToTwoDp(-3.777), -3.78);
})

test('Decimal is rounded down correctly for set Q-', t => {
    t.deepEqual(roundToTwoDp(-1.434), -1.43);
})

// Payment Analysis
test('Payments are analysed correctly for set Z', t => {
    t.deepEqual(analysePayments([{
            "Amount": 1,
            "TransactionInformation": "Payment One"
        },
        {
            "Amount": -2,
            "TransactionInformation": "Payment Two"
        },
        {
            "Amount": 3,
            "TransactionInformation": "Payment Three"
        },
        {
            "Amount": -4,
            "TransactionInformation": "Payment Four"
        }
    ]), {
        max: 3,
        mean: -0.5,
        median: -0.5,
        min: -4,
        standardDeviation: 2.69,
    })
})

test('Payments are analysed correctly for set Q', t => {
    t.deepEqual(analysePayments([{
            "Amount": 1.54,
            "TransactionInformation": "Payment One"
        },
        {
            "Amount": -2.03,
            "TransactionInformation": "Payment Two"
        },
        {
            "Amount": 3.69,
            "TransactionInformation": "Payment Three"
        },
        {
            "Amount": -4.23,
            "TransactionInformation": "Payment Four"
        }
    ]), {
        max: 3.69,
        mean: -0.26,
        median: -0.25,
        min: -4.23,
        standardDeviation: 3.07,
    })
})