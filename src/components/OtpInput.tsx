import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { FormikErrors } from "formik";

const OtpInput = ({
  otp,
  setValues,
}: {
  otp: string;
  setValues: (
    values: React.SetStateAction<{
      otp: string;
    }>,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<{
    otp: string;
  }>>;
}) => {
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      value={otp}
      onChange={(otp) => setValues({ otp })}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OtpInput;
