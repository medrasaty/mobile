import { toast } from "burnt";

const Toast = {
  success: (message: string) => {
    toast({
      title: message,
      message: message,
      haptic: "success",
    });
  },
  error: (message: string) => {
    toast({
      title: message,
      message: message,
      haptic: "error",
    });
  },
};

export default Toast;
