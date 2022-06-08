import { useEffect, useState } from "react";
import styled from "styled-components"

const Container = styled.div`
  display : flex;
  margin : 50px auto;
  width : 350px;
  height : auto;
  flex-direction : column;
  background : black;
  justify-content : center;
`;

const Span = styled.span`
  margin : 0 auto;
  width : inherit - 5px;
  margin : 5px;
  color : white;
  font-size : 32px;
  text-align : end;
  height : 75px;
  background : gray;
`;

const Line = styled.div`
  width: auto;
  height: 75px;
  flex-flow : row;
  margin:5px;
`;

const Button = styled.button`
  width : ${props => {
    return props.value === "0" ? "150px" : "75px"
  }};
  height: "75px";
  border-radius : ${props => props.value === "0" ? "50px" : "100%"};
  font-size: 25px;
  padding : 15px;
  margin-left : 5px;
`;

function calculation(value, secValue, param) {
  if (param === "*") {
    return (value * secValue);
  } else if (param === "-") {
    return (secValue - value)
  } else if (param === "+") {
    return (secValue + value)
  } else if (param === "/") {
    if (secValue === 0)
      return 0;
    return (secValue / value);
  } else if (param === "%") {
    return (secValue % value);
  }
  return 0;
}



function Calculater() {
  const [arrBtn, setArrBtn] = useState([[]])
  const [value, setValue] = useState(0);
  const [secValue, setSecValue] = useState(0);
  const [param, setParam] = useState("");

  useEffect(() => {
    setArrBtn([
      ["ac", "+/-", "%", "/"],
      ["7", "8", "9", "*"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ".", "="]
    ]);
  }, []);

  const addSecValueAndParam = (param) => {
    setSecValue(value);
    setValue(0);
    setParam(param);
  }

  const onClick = (e) => {
    const total = Number.isInteger(value);
    if (e.target.value === "ac") {
      setValue(0);
    } else if (parseInt(e.target.value)) {
      if (total) {
        setValue(value * 10 + parseInt(e.target.value));
      }
      else {
        if (value * 10 - parseInt(value) * 10 === 0) {
          setValue(parseFloat(value) + e.target.value / 10);
        } else {
          setValue(parseFloat(String(value) + e.target.value));
        }
      }
    } else {
      if (parseInt(e.target.value) === 0) {
        setValue(value * 10);
      } else if (e.target.value === "." && total) {
        setValue(parseFloat(value).toFixed(0));
      }
      else if (e.target.value === "+/-") {
        setValue(value * -1);
      }
      else if (e.target.value === "*") {
        addSecValueAndParam("*");
      }
      else if (e.target.value === "+") {
        addSecValueAndParam("+");
      }
      else if (e.target.value === "-") {
        addSecValueAndParam("-");
      }
      else if (e.target.value === "/") {
        addSecValueAndParam("/");
      }
      else if (e.target.value === "%") {
        addSecValueAndParam("%");
      }
      else if (e.target.value === "=") {
        if (secValue === 0)
          return;
        setValue(calculation(value, secValue, param));
        setSecValue(0);
      }
    }
  }

  return (
    <Container>
      <Span>{value}</Span>
      {arrBtn.map((arr, i) => {
        return <Line>
          {arr.map((item, j) => <Button onClick={onClick} value={item} key={i + "" + j}>{item}</Button>)}
        </Line>
      })}
    </Container>
  );
}

export default Calculater;