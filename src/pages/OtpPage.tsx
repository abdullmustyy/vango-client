import { Formik, Form, FormikHelpers, Field, FieldProps } from "formik";
import OTPInput from "react-otp-input";
import { otpSchema } from "../utils/validations/auth.validation";
import { useAppSelector } from "../app/hooks";
import { useCallback } from "react";
import { IOtpValues } from "../utils/interfaces/auth.interface";
import { initialOtpValues } from "../utils/constants/auth.constant";

const OtpPage = () => {
  const { error: errorState } = useAppSelector((state) => state.auth);

  const handleSubmit = useCallback(
    (values: IOtpValues, actions: FormikHelpers<IOtpValues>) => {
      console.log(values, actions);
      actions.setSubmitting(false);
    },
    []
  );

  return (
    <section className="container mx-auto md:grid place-content-center h-screen md:px-0 px-4 text-[#161616] select-text">
      <div className="md:w-[40rem] space-y-6">
        <h1 className="md:text-4xl text-2xl font-bold text-center">
          Enter OTP
        </h1>
        <Formik
          initialValues={initialOtpValues}
          validationSchema={otpSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({ isSubmitting, setValues, values }) => (
            <Form className="grid gap-4">
              <Field name="otp">
                {({ meta }: FieldProps) => (
                  <div className="space-y-4">
                    <OTPInput
                      value={values.otp}
                      onChange={(otp: string) => setValues({ otp })}
                      numInputs={6}
                      inputType="tel"
                      inputStyle={
                        "block text-center size-12 border border-gray-300 focus:border-[#FF8C38] focus:outline-none focus:ring ring-[#FF8C38]/50 rounded-md"
                      }
                      containerStyle={"flex justify-center gap-4"}
                      skipDefaultStyles={true}
                      shouldAutoFocus={true}
                      renderInput={(props) => <input {...props} />}
                    />
                    {meta.touched && meta.error && (
                      <div className="text-sm text-red-600 text-center">
                        {meta.error}
                      </div>
                    )}
                  </div>
                )}
              </Field>
              {errorState && (
                <h3 className="text-base text-center text-red-600 font-semibold">
                  {errorState}
                </h3>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? "opacity-80 cursor-not-allowed" : null
                } bg-[#FF8C38] w-32 rounded-md py-3 text-base font-bold text-white place-self-center hover:outline outline-2 outline-[#FF8C38] transition`}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default OtpPage;
