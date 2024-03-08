import PropTypes from "prop-types";
import Editor from "../Editor";

const Wysiwyg = ({
    name,
    onChange,
    value,
    intlLabel,
    disabled,
    error,
    description,
    required,
}) => {
    return (
      <Editor
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
      />
    );
};

Wysiwyg.defaultProps = {
    description: "",
    disabled: false,
    error: undefined,
    intlLabel: "",
    required: false,
    value: "",
};

Wysiwyg.propTypes = {
    description: PropTypes.shape({
        id: PropTypes.string,
        defaultMessage: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    error: PropTypes.string,
    intlLabel: PropTypes.shape({
        id: PropTypes.string,
        defaultMessage: PropTypes.string,
    }),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
};

export default Wysiwyg;
