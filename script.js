document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill");
  const tipRange = document.getElementById("tip-range");
  const tipPercentage = document.getElementById("tip-percentage");
  const tipAmount = document.getElementById("tip-amount");
  const totalTip = document.getElementById("total-tip");
  const totalTax = document.getElementById("total-tax");
  const totalWithBoth = document.getElementById("total-with-both");
  const currency = document.getElementById("currency");
  const convertedTip = document.getElementById("converted-tip");
  const convertedTotal = document.getElementById("converted-total");
  const error = document.getElementById("error");

  function updateValues() {
    const bill = parseFloat(billInput.value);
    const tip = parseInt(tipRange.value);

    if (isNaN(bill) || bill < 0) {
      error.textContent = "Please enter a valid non-negative number for the bill.";
      resetFields();
      return;
    }

    if (bill === 0) {
      error.textContent = "";
      resetFields();
      return;
    }

    error.textContent = "";
    tipPercentage.value = `${tip}%`;

    const tipVal = bill * (tip / 100);
    const totalWithTip = bill + tipVal;
    const tax = bill * 0.11;
    const totalBoth = totalWithTip + tax;

    tipAmount.value = tipVal.toFixed(2);
    totalTip.value = totalWithTip.toFixed(2);
    totalTax.value = tax.toFixed(2);
    totalWithBoth.value = totalBoth.toFixed(2);

    updateCurrency(tipVal, totalBoth);
  }

  function resetFields() {
    tipPercentage.value = "";
    tipAmount.value = "";
    totalTip.value = "";
    totalTax.value = "";
    totalWithBoth.value = "";
    convertedTip.value = "";
    convertedTotal.value = "";
  }

  function updateCurrency(tipVal, totalBoth) {
    const type = currency.value;
    let tipConverted = tipVal;
    let totalConverted = totalBoth;

    if (type === "INR") {
      tipConverted = tipVal * 83.23;
      totalConverted = totalBoth * 83.23;
      convertedTip.value = `₹ ${tipConverted.toFixed(2)}`;
      convertedTotal.value = `₹ ${totalConverted.toFixed(2)}`;
    } else if (type === "EUR") {
      tipConverted = tipVal * 0.93;
      totalConverted = totalBoth * 0.93;
      convertedTip.value = `€ ${tipConverted.toFixed(2)}`;
      convertedTotal.value = `€ ${totalConverted.toFixed(2)}`;
    } else {
      convertedTip.value = `$ ${tipVal.toFixed(2)}`;
      convertedTotal.value = `$ ${totalBoth.toFixed(2)}`;
    }
  }

  document.getElementById("tip-form").addEventListener("input", updateValues);
  currency.addEventListener("change", () => {
    const bill = parseFloat(billInput.value);
    const tipVal = bill * (parseInt(tipRange.value) / 100);
    const totalWithTip = bill + tipVal;
    const tax = bill * 0.11;
    const totalBoth = totalWithTip + tax;
    updateCurrency(tipVal, totalBoth);
  });
});
