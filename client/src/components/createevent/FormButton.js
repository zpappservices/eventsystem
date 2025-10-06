import { Loader2 } from "lucide-react";
import Button from "../widgets/Button";

const FormButton = ({ handleAction, position, direction, isLoading, ...props }) => {
  return (
    <div className={`p-4 flex ${position ? position : "justify-center"}`}>
      <Button isLoading={isLoading} {...props}>{direction}</Button>
    </div>
  );
};

export default FormButton;
