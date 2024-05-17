import './loader.scss';

export const Loader = () => (
  <div className="color-wrap">
    { Array.from({ length: 50 }, ( _val, index ) => index ).map( ( value ) => {
        return <div key={ value } className={ `box-${ value }` }></div>;
      })
    }
  </div>
);