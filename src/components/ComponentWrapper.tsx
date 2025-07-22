export const ComponentWrapper = ({ children, className, id }: any) => {
  return (
    <section className={`${className} section`} id={id}>
      <div className='heading-content-wrapper'>{children}</div>
    </section>
  );
};

export default ComponentWrapper;
