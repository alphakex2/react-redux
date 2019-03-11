import React, { ReactElement, useState } from 'react';

import { useFormState, FormState } from 'react-use-form-state';

import Select from 'react-select';

import { Template } from '../../store/basic.types';

// const banks = [{
//   "bankCode": "BNK2CIO",
//   "bankName": "Bank 2",
//   "publicKey": "PkrbBRIFdVx3x/wfsjpQKyNkP4W5f43QNOITnTudegw=",
//   "verifierApiLink": "https://api-verify.b2.cronica.pro",
//   "issuerApiLink": "https://api-issuer.b2.cronica.pro",
//   "frontEndLink": "https://verify.b2.cronica.pro"
// }]

const banks = [
  { value: 'chocolate', label: 'Chocolate' }
]



export interface FormFields {
  id: string;
  holder: string;
  name: string;
  date: string;
  type: string;
}

export interface Props {
  template: Template;
  onSubmit: (data: FormState<FormFields>) => void;
}

function IssueDocForm(props: Props): ReactElement {

  const [formIsValid, setFormValidity] = useState(false);
  const [formIsTouched, setFormTouch] = useState(false);

  const [formState, { text, radio }] = useFormState<FormFields>({
    type: 'private'
  });

  const handleSubmit = () => {
    props.onSubmit(formState);
  }

  console.log(formState);

  return (
    <form className="BaseForm IssueDocForm" onSubmit={handleSubmit} >
      <div className="form-group">
        <input hidden={!!props.template.name} type="text" className="form-control" placeholder="Document Name" {...text('name')} />
      </div>
      <div className="form-group">
        <input type="text" required className="form-control" placeholder="Document Holder" {...text('holder')} />
      </div>
      <div className="form-group">
        <input type="text" required className="form-control" placeholder="Issue Date"  {...text('date')} />
      </div>
      <div className="form-group row">
        <div className="col-4 radio">
          <input {...radio('type', 'private')} id="private" />
          <label className="radio" htmlFor="private">Private</label>
        </div>
        <div className="col-4 radio">
          <input {...radio('type', 'public')} id="public" />
          <label className="radio" htmlFor="public">Public</label>
        </div>
        <div className="col-4 radio">
          <input {...radio('type', 'limited')} id="limited" />
          <label className="radio" htmlFor="limited">Limited</label>
        </div>
      </div>
      {formState.values.type === 'limited' &&
        <div className="form-group">
          <Select className="Select" classNamePrefix="Select" isMulti clearable={false} options={banks} />
        </div>
      }
      <button type="button" className="btn btn-block btn-lg btn-primary" onClick={handleSubmit} disabled={!formIsValid}>Submit</button>
    </form>
  )
}

export default IssueDocForm;