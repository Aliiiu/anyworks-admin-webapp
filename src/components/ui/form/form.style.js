import styled from 'styled-components';

export const Fieldset = styled.fieldset`
	input,
	textarea {
		margin-top: 0.25rem;
		width: 100%;
		border-radius: 0.5rem;
		background-color: #c2cfd633;
		padding-left: 1rem;
		padding-right: 1rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 300;
		height: 50px;
		outline: 0;
	}
	textarea {
		height: auto;
		resize: none;
		padding-top: 0.5rem;
	}
`;

export const PassType = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	input {
		width: 100%;
		border: none;
	}
	.p_visible {
		width: 5%;
		cursor: pointer;
		font-size: 16px;
		margin-bottom: 0.5em;
		margin-right: 5em;
	}
`;

export const SelectInput = styled.fieldset`
  display: flex;
  /* justify-content: flex-start; */
  border-radius: 8px;
  box-sizing: border-box;
  padding: 0 ${(props) => props.padX || '1em'};
  padding-bottom: ${(props) => props.padB || '10em'}
  font-size: 13px;
  text-align:left;
  legend {
    color: #000;
    font-size: 12px;
    opacity: 0.7;
    font-weight: 500;
    /* background-color:red */
  }
  input,
  textarea {
    outline: none;
    border: none;
    font-size: 14px;
    background: transparent;
    width: 100%;
    box-sizing: border-box;
    height: ${(props) => props.height || '38px'};
    padding-bottom: 0.5em;
  }
  textarea {
    min-height: 8em;
    max-height: 8em;
  }
  .list-btn {
    box-sizing: border-box;
    height: 38px;
    padding-bottom: 0.5em;
  }
  input::placeholder {
    font-size: 14px;
  }
  #banks {
    background-color: #fff !important;
    option {
      background-color: #fff !important;
      color: #000;
    }
  }
  .select-field {
    border: none !important;
    /* background-color: red; */
  }
  .css-1s2u09g-control{
    border-width: 0;
    outline: none;
    &&::focus{
      background-color: red;
      outline: none;
    }
  }
`;

export const ToggleContainer = styled.div`
	.toggle-checkbox:checked {
		right: 0;
		border-color: #922333;
	}
	.toggle-checkbox:checked + .toggle-label {
		background-color: #992333;
	}
`;

export const Checkboxinput = styled.input`
	#checkbox1:checked {
		border-color: red;
		background-color: red;
	}
`;

export const CheckboxDiv = styled.div`
	/* background-color: #2c3e50; */
	color: #922333;
	font-family: sans-serif;
	/* font-weight: 500; */
	font-size: 14px;
	span.bigcheck-target {
		font-family: FontAwesome; /* use an icon font for the checkbox */
	}
	input[type='checkbox'].bigcheck {
		position: relative;
		left: -999em;
	}
	input[type='checkbox'].bigcheck + span.bigcheck-target:after {
	}
	input[type='checkbox'].bigcheck:checked + span.bigcheck-target:after {
	}
	span.bigcheck {
		display: block;
		padding: 0.5em;
	}
`;
