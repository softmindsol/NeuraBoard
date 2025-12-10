import React from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const ROLE_OPTIONS = ["Command Center", "Integrations"];

const teamSchema = Yup.object().shape({
  members: Yup.array()
    .of(
      Yup.object().shape({
        email: Yup.string()
          .email("Please enter a valid email")
          .nullable(),
        roles: Yup.array().of(Yup.string()),
      })
    )
    .min(1),
  // first member email required
  firstEmail: Yup.string()
    .email("Please enter a valid email")
    .required("At least one team member email is required"),
});

const TeamStep = () => {
  const { nextStep } = useOnboardingStore();

  const initialValues = {
    members: [
      { email: "", roles: ["Command Center", "Integrations"] },
      { email: "", roles: [] },
    ],
    firstEmail: "", // mirror of members[0].email for validation
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Team members:", values.members);
    setTimeout(() => {
      setSubmitting(false);
      nextStep();
    }, 300);
  };

  return (
    <div className="relative min-h-[calc(100vh-90px)] flex items-center justify-center bg-[#f7f7fb] px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-6 py-10 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            Invite your team
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={teamSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldArray name="members">
                {({ push }) => (
                  <>
                    {values.members.map((member, index) => {
                      const emailError =
                        errors.members &&
                        errors.members[index] &&
                        errors.members[index].email &&
                        touched.members &&
                        touched.members[index] &&
                        touched.members[index].email;

                      const handleAddRole = (role) => {
                        if (!role) return;
                        const existing = member.roles || [];
                        if (!existing.includes(role)) {
                          const updated = [...existing, role];
                          setFieldValue(`members[${index}].roles`, updated);
                        }
                      };

                      const handleRemoveRole = (role) => {
                        const updated =
                          member.roles?.filter((r) => r !== role) || [];
                        setFieldValue(`members[${index}].roles`, updated);
                      };

                      const availableRoles = ROLE_OPTIONS.filter(
                        (r) => !member.roles?.includes(r)
                      );

                      return (
                        <div
                          key={index}
                          className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]"
                        >
                          {/* Email input */}
                          <div className="space-y-1">
                            <input
                              type="email"
                              name={`members[${index}].email`}
                              placeholder="example@gmail.com"
                              value={member.email}
                              onChange={(e) => {
                                handleChange(e);
                                if (index === 0) {
                                  setFieldValue("firstEmail", e.target.value);
                                }
                              }}
                              onBlur={handleBlur}
                              className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition bg-white
                                focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                                ${
                                  emailError
                                    ? "border-red-500"
                                    : "border-gray-200"
                                }`}
                            />
                            {index === 0 &&
                              errors.firstEmail &&
                              touched.firstEmail && (
                                <p className="text-xs text-red-500">
                                  {errors.firstEmail}
                                </p>
                              )}
                            {emailError && (
                              <p className="text-xs text-red-500">
                                {errors.members[index].email}
                              </p>
                            )}
                          </div>

                          {/* Roles selector */}
                          <div className="space-y-1">
                            <div className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm flex flex-wrap items-center gap-2">
                              {member.roles && member.roles.length > 0 ? (
                                member.roles.map((role) => (
                                  <span
                                    key={role}
                                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full"
                                  >
                                    {role}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveRole(role)}
                                      className="text-[10px] leading-none"
                                    >
                                      ✕
                                    </button>
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-gray-400">
                                  Select permissions
                                </span>
                              )}

                              {/* simple dropdown to add role */}
                              {availableRoles.length > 0 && (
                                <select
                                  value=""
                                  onChange={(e) => {
                                    handleAddRole(e.target.value);
                                  }}
                                  className="ml-auto text-xs text-purple-600 bg-transparent border-none outline-none cursor-pointer"
                                >
                                  <option value="">Add</option>
                                  {availableRoles.map((role) => (
                                    <option key={role} value={role}>
                                      {role}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Add another member */}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          email: "",
                          roles: [],
                        })
                      }
                      className="mt-1 text-sm font-semibold text-purple-600"
                    >
                      + Add another team member
                    </button>
                  </>
                )}
              </FieldArray>

              {/* Send Invite button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-72 rounded-full bg-purple-600 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-purple-700 transition disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Invite"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TeamStep;
