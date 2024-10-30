import * as T from 'types';


export const Data: React.FC<T.Props.Data> = ({
  label, value,
}) => {

  return (
    <div className="data">
      <div className="label">
        {label}
      </div>
      <div className="value">
        {value}
      </div>
    </div>
  );

};
