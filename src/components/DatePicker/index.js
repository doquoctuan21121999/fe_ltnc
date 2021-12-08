import React, { useState } from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import { toast } from "react-toastify";
// reactstrap components
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

export const RangePicker = (prop) => {
  const {
    placeHolder,
    onChange,
    defaultValue,
    disabledBeforeDate = false,
  } = prop;
  const [state, setState] = useState(defaultValue || {});
  const [focus, setFocus] = useState(false);

  const handleChange = (item) => {
    if (disabledBeforeDate && item.startDate < new Date()) {
      return;
    }
    if (disabledBeforeDate && item.endDate < new Date()) {
      return;
    }
    if (item.startDate && item.endDate && item.startDate >= item.endDate) {
      toast.warning("Thời gian kết thúc lớn hơn thời gian bắt đầu");
    }
    setState(item);
    onChange(item);
  };

  return (
    <>
      <div className="d-flex">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-calendar-grid-58" />
            </InputGroupText>
          </InputGroupAddon>
          <ReactDatetime
            closeOnSelect
            className=""
            inputProps={{
              placeholder:
                placeHolder && placeHolder.length > 0 && placeHolder[0],
              disabled: prop.isDisabled && prop.isDisabled[0],
              value: state.startDate
                ? state.startDate.format("DD/MM/YYYY")
                : undefined,
            }}
            dateFormat={"DD/MM/YYYY"}
            timeFormat={false}
            focus
            renderDay={(props, currentDate, selectedDate) => {
              let classes = props.className;
              if (disabledBeforeDate && currentDate._d < new Date()) {
                classes += " disable-date-picker";
                classes = classes.replace("rdtDay");
              }
              if (
                state.startDate &&
                state.endDate &&
                state.startDate._d + "" === currentDate._d + ""
              ) {
                classes += " start-date";
              } else if (
                state.startDate &&
                state.endDate &&
                new Date(state.startDate._d + "") <
                  new Date(currentDate._d + "") &&
                new Date(state.endDate._d + "") > new Date(currentDate._d + "")
              ) {
                classes += " middle-date";
              } else if (
                state.endDate &&
                state.endDate._d + "" === currentDate._d + ""
              ) {
                classes += " end-date";
              }

              return (
                <td {...props} className={classes}>
                  {currentDate.date()}
                </td>
              );
            }}
            onChange={(e) =>
              handleChange({ startDate: e, endDate: state.endDate })
            }
          />
        </InputGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-calendar-grid-58" />
            </InputGroupText>
          </InputGroupAddon>
          <ReactDatetime
            value={state.endDate}
            inputProps={{
              placeholder:
                placeHolder && placeHolder.length > 1 && placeHolder[1],
              disabled: prop.isDisabled && prop.isDisabled[1],
              value: state.endDate
                ? state.endDate.format("DD/MM/YYYY")
                : undefined,
            }}
            dateFormat={"DD/MM/YYYY"}
            timeFormat={false}
            renderDay={(props, currentDate, selectedDate) => {
              let classes = props.className;
              if (disabledBeforeDate && currentDate._d < new Date()) {
                classes += " disable-date-picker";
                classes = classes.replace("rdtDay");
              }
              if (
                state.startDate &&
                state.endDate &&
                state.startDate._d + "" === currentDate._d + ""
              ) {
                classes += " start-date";
              } else if (
                state.startDate &&
                state.endDate &&
                new Date(state.startDate._d + "") <
                  new Date(currentDate._d + "") &&
                new Date(state.endDate._d + "") > new Date(currentDate._d + "")
              ) {
                classes += " middle-date";
              } else if (
                state.endDate &&
                state.endDate._d + "" === currentDate._d + ""
              ) {
                classes += " end-date";
              }

              return (
                <td {...props} className={classes}>
                  {currentDate.date()}
                </td>
              );
            }}
            onChange={(e) =>
              handleChange({ startDate: state.startDate, endDate: e })
            }
          />
        </InputGroup>
      </div>
    </>
  );
};

export const MultiDateSelect = (prop) => {
  const { placeHolder, onChange, defaultValue } = prop;
  const [state, setState] = useState(defaultValue || []);
  const [focus, setFocus] = useState(false);

  console.log(defaultValue);
  const handleChange = (newItem) => {
    const indexItem = state.findIndex(
      (item) => item._d + "" == newItem._d + ""
    );
    if (indexItem === -1) {
      setState([newItem, ...state]);
      onChange([newItem, ...state]);
    } else {
      let newState = Object.assign([], state);
      newState.splice(indexItem, 1);
      setState(newState);
      onChange(newState);
    }
  };
  return (
    <>
      <div className="d-flex">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-calendar-grid-58" />
            </InputGroupText>
          </InputGroupAddon>
          <ReactDatetime
            className=""
            inputProps={{
              placeholder:
                placeHolder && placeHolder.length > 0 && placeHolder[0],
            }}
            dateFormat={"DD/MM/YYYY"}
            timeFormat={false}
            focus
            value={state.startDate}
            renderDay={(props, currentDate, selectedDate) => {
              let classes = props.className;
              let index = state.findIndex(
                (item) => item._d + "" == currentDate._d + ""
              );
              if (index !== -1) {
                classes = classes + " start-date";
              } else {
                classes = "rdtDay";
              }
              return (
                <td {...props} className={classes}>
                  {currentDate.date()}
                </td>
              );
            }}
            onChange={(e) => handleChange(e)}
          />
        </InputGroup>
      </div>
    </>
  );
};

export const DatePicker = (prop) => {
  const { placeHolder, onChange } = prop;
  const [state, setState] = useState({});
  return (
    <>
      <FormGroup>
        <InputGroup className="input-group-alternative">
          {/* <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-calendar-grid-58" />
            </InputGroupText>
          </InputGroupAddon> */}
          <ReactDatetime
            inputProps={{
              placeholder: placeHolder,
              readOnly: true,
            }}
            timeFormat={false}
            onChange={(e) => onChange(e)}
          />
        </InputGroup>
      </FormGroup>
    </>
  );
};
