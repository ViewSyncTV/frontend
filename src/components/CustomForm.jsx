import { useEffect, useState } from "react";
import { InlineSuggest } from "@zegal/react-inline-suggest";
import Textarea from "react-textarea-with-suggest";

function CustomForm({ children, ...props }) {
  return (
    <div className="p-4 text-center">
      <div className="form-control">{children}</div>
    </div>
  );
}

CustomForm.InputText = function CustomFormInputText({
  label,
  value,
  onChange,
  className,
  inputList,
  ...props
}) {
  return (
    <>
      <label className="label text-center">
        <span className="label-text w-full">{label}</span>
      </label>
      <input
        type="text"
        className={
          "input input-bordered w-full justify-center " +
          (className !== undefined ? className : "")
        }
        placeholder={label}
        value={value}
        onChange={onChange}
        list={inputList}
      />
    </>
  );
};

CustomForm.AutoCompleteTextInput = function CustomFormAutoCompleteTextInput({
  label,
  value,
  onChange,
  items,
  autoCompleteKey,
  className,
}) {
  // Change the input inside of InlineSuggest to have className = "input input-bordered w-full justify-center
  useEffect(() => {
    // query the input element inside of the div with id = autoCompleteKey
    const input = document.querySelector(`#${autoCompleteKey} input`);
    if (input) {
      let classtoadd =
        "!input !input-bordered w-full justify-center !bg-transparent !absolute " +
        (className !== undefined ? className : "");
      input.className = input.className + " " + classtoadd;
      const span = document.querySelectorAll(`#${autoCompleteKey} span`);
      if (span.length > 1) {
        span[1].className =
          "w-full h-12 pl-4 text-left left-0 absolute opacity-50 items-center inline-flex min-w-max ";
      }
    }
  }, []);
  return (
    <div id={autoCompleteKey}>
      <label className="label text-center">
        <span className="label-text w-full">{label}</span>
      </label>
      <InlineSuggest
        className={
          "w-full text-left " + (className !== undefined ? className : "")
        }
        suggestions={items}
        initialValue={value}
        inputValue={value}
        value={value}
        onInputChange={onChange}
        placeholder={label}
        onMatch={(match) => {
          console.log("match", match);
        }}
        ignoreCase
        switchBetweenSuggestions
      />
    </div>
  );
};

CustomForm.AutoCompleteTextArea = function CustomFormAutoCompleteTextArea({
  label,
  value,
  onChange,
  items,
  autoCompleteKey,
  className,
}) {
  const [shownItems, setShownItems] = useState([]);
  function search(searchPhrase) {
    console.log("searchPhrase", searchPhrase);
    if (searchPhrase === "") {
      setShownItems(items);
      return;
    }
    let toShowItems = items.filter((item) =>
      item.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    toShowItems.sort(
      (a, b) =>
        a.toLowerCase().indexOf(searchPhrase.toLowerCase()) -
        b.toLowerCase().indexOf(searchPhrase.toLowerCase())
    );
    setShownItems(toShowItems);
  }
  return (
    <>
      <label className="label text-center">
        <span className="label-text w-full">{label}</span>
      </label>
      <Textarea
        key={autoCompleteKey}
        className={
          "textarea textarea-bordered !w-full text-left !relative !left-0 shadow-primary hover:border-primary focus:border-primary" +
          (className !== undefined ? className : "")
        }
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSearch={(searchPhrase) => search(searchPhrase)}
        suggestList={shownItems}
        searchMarker="@"
        autoFocus
        autosizable
        closeSuggestOnFocusOut
      />
    </>
  );
};

CustomForm.TextArea = function CustomFormTextArea({
  label,
  placeholder,
  value,
  onChange,
  className,
  ...props
}) {
  return (
    <>
      <label className="label text-center">
        <span className="label-text w-full">{label}</span>
      </label>
      <textarea
        className={
          "textarea h-24 textarea-bordered w-full " +
          (className !== undefined ? className : "")
        }
        placeholder={placeholder ? placeholder : label}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

CustomForm.Select = function CustomFormSelect({
  label,
  value,
  onChange,
  options,
  disabled,
  children,
  ...props
}) {
  return (
    <>
      <label className="label text-center">
        <span className="label-text w-full">{label}</span>
      </label>
      <select
        className="select select-bordered w-full max-w-xl"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </select>
    </>
  );
};

CustomForm.Option = function CustomFormOption({
  value,
  children,
  ...props
}) {
  return <option value={value}>{children}</option>;
};

CustomForm.InputNumber = function CustomFormInputNumber({
  label,
  value,
  onChange,
  ...props
}) {
  return (
    <>
      <label className="label text-center">
        <span className="label-text w-full">{label}</span>
      </label>
      <input
        type="number"
        className="input input-bordered w-full max-w-xl"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

CustomForm.InputDate = function CustomFormInputDate({
  label,
  value,
  onChange,
  ...props
}) {
  return (
    <>
      <label className="label text-center">
        <span className="label-text w-full">{label}</span>
      </label>
      <input
        type="date"
        className="input input-bordered w-full max-w-xl"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

CustomForm.Button = function CustomFormButton({
  onClick,
  className,
  children,
  htmlFor,
  ...props
}) {
  return (
    <label
      className={
        "btn btn-outline btn-wide tracking-widest mt-4 " +
        (className !== undefined ? className : "")
      }
      onClick={onClick}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default CustomForm;
