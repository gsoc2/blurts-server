/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use client";

import { FormEventHandler, useId, useState } from "react";
import { signIn } from "next-auth/react";
import { useL10n } from "../../../hooks/l10n";
import { Button } from "../../../components/server/Button";

export type Props = {
  eligibleForPremium: boolean;
  signUpCallbackUrl: string;
};

export const SignUpForm = (props: Props) => {
  const emailInputId = useId();
  const l10n = useL10n();
  const [emailInput, setEmailInput] = useState("");

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    void signIn(
      "fxa",
      { callbackUrl: props.signUpCallbackUrl },
      // This passes an `?email=` query parameter to FxA, causing it to prefill
      // the email address in the sign-up form. See
      // https://mozilla.github.io/ecosystem-platform/relying-parties/reference/query-parameters#email
      { email: emailInput },
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name={emailInputId}
        id={emailInputId}
        onChange={(e) => setEmailInput(e.target.value)}
        value={emailInput}
        type="email"
        placeholder={l10n.getString(
          "landing-all-hero-emailform-input-placeholder",
        )}
      />
      <Button type="submit" variant="primary" wide>
        {l10n.getString("landing-all-hero-emailform-submit-label")}
      </Button>
      <label htmlFor={emailInputId}>
        {l10n.getString(
          props.eligibleForPremium
            ? "landing-premium-hero-emailform-input-label"
            : "landing-all-hero-emailform-input-label",
        )}
      </label>
    </form>
  );
};
