import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  const override = {
    display: "block",
    margin: "20px auto",
    borderWidth:'4px'
  };
  return (
      <ClipLoader color='#ec2126' cssOverride={override} size={100} />
  );
};

const SpinnerWithContainer = ({ color = "text-success" }) => {
  const override = {
    display: "block",
    margin: "20px auto",
    borderWidth:'4px'
  };
  return (
    <div className="minimum-height container background-color-white">
      <ClipLoader color='#ec2126' cssOverride={override} size={100} />
    </div>
  );
};

export { Spinner, SpinnerWithContainer };
