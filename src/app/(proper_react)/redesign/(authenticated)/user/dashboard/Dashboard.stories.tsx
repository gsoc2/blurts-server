/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import type { Meta, StoryObj } from "@storybook/react";

import { OnerepScanResultRow, OnerepScanRow } from "knex/types/tables";
import { View as DashboardEl } from "./View";
import { Shell } from "../../../Shell";
import { getEnL10nSync } from "../../../../../functions/server/mockL10n";
import {
  createRandomScanResult,
  createRandomBreach,
  createUserWithPremiumSubscription,
} from "../../../../../../apiMocks/mockData";
import { SubscriberBreach } from "../../../../../../utils/subscriberBreaches";
import { LatestOnerepScanData } from "../../../../../../db/tables/onerep_scans";
import { canSubscribeToPremium } from "../../../../../functions/universal/user";
import { CountryCodeProvider } from "../../../../../../contextProviders/country-code";

const brokerOptions = {
  "no-scan": "No scan started",
  empty: "No scan results",
  unresolved: "With unresolved scan results",
  resolved: "All scan results resolved",
  "scan-in-progress": "Scan is in progress",
};
const breachOptions = {
  empty: "No data breaches",
  unresolved: "With unresolved data breaches",
  resolved: "All data breaches resolved",
};
type DashboardWrapperProps = (
  | {
      countryCode: "us";
      brokers: keyof typeof brokerOptions;
      premium: boolean;
    }
  | {
      countryCode: "nl";
    }
) & {
  brokers: keyof typeof brokerOptions;
  breaches: keyof typeof breachOptions;
};
const DashboardWrapper = (props: DashboardWrapperProps) => {
  const mockedResolvedBreach: SubscriberBreach = createRandomBreach({
    dataClasses: [
      "email-addresses",
      "ip-addresses",
      "phone-numbers",
      "passwords",
      "pins",
      "social-security-numbers",
      "partial-credit-card-data",
      "security-questions-and-answers",
    ],
    addedDate: new Date("2023-06-18T14:48:00.000Z"),
    dataClassesEffected: [
      { "email-addresses": ["email1@gmail.com", "email2@gmail.com"] },
      { "ip-addresses": 1 },
      { "phone-numbers": 1 },
      { passwords: 1 },
    ],
    isResolved: true,
  });

  const mockedUnresolvedBreach: SubscriberBreach = createRandomBreach({
    dataClasses: ["email-addresses", "ip-addresses", "phone-numbers"],
    addedDate: new Date("2023-06-18T14:48:00.000Z"),
    dataClassesEffected: [
      { "email-addresses": ["email1@gmail.com", "email2@gmail.com"] },
      { "ip-addresses": 1 },
    ],
    isResolved: false,
  });

  let breaches: SubscriberBreach[] = [];
  if (props.breaches === "resolved") {
    breaches = [mockedResolvedBreach];
  }
  if (props.breaches === "unresolved") {
    breaches = [mockedResolvedBreach, mockedUnresolvedBreach];
  }

  const mockedScan: OnerepScanRow = {
    created_at: new Date(1998, 2, 31),
    updated_at: new Date(1998, 2, 31),
    id: 0,
    onerep_profile_id: 0,
    onerep_scan_id: 0,
    onerep_scan_reason: "initial",
    onerep_scan_status: "finished",
  };

  const mockedScanInProgress: OnerepScanRow = {
    ...mockedScan,
    onerep_scan_status: "in_progress",
  };

  const mockedInProgressScanResults: OnerepScanResultRow[] = [
    createRandomScanResult({ status: "removed" }),
    createRandomScanResult({ status: "waiting_for_verification" }),
    createRandomScanResult({ status: "optout_in_progress" }),
  ];

  const mockedAllResolvedScanResults: OnerepScanResultRow[] = [
    createRandomScanResult({ status: "removed" }),
    createRandomScanResult({ status: "removed" }),
  ];

  const mockedUnresolvedScanResults: OnerepScanResultRow[] = [
    ...mockedInProgressScanResults,
    createRandomScanResult({ status: "new", manually_resolved: false }),
    createRandomScanResult({ status: "new", manually_resolved: false }),
    createRandomScanResult({ status: "new", manually_resolved: true }),
  ];

  const scanData: LatestOnerepScanData = { scan: null, results: [] };
  let scanCount = 0;

  if (props.countryCode === "us") {
    if (props.brokers && props.brokers !== "no-scan") {
      const scanInProgress = props.brokers === "scan-in-progress";
      scanData.scan = scanInProgress ? mockedScanInProgress : mockedScan;

      if (scanInProgress) {
        scanCount = 1;
      }
      if (props.brokers === "resolved") {
        scanData.results = mockedAllResolvedScanResults;
      }
      if (props.brokers === "unresolved") {
        scanData.results = mockedUnresolvedScanResults;
      }
    }
  }

  const user = createUserWithPremiumSubscription();
  if (props.countryCode !== "us" || !props.premium) {
    user.fxa.subscriptions = [];
  }

  const mockedSession = {
    expires: new Date().toISOString(),
    user: user,
  };

  return (
    <CountryCodeProvider countryCode={props.countryCode}>
      <Shell
        l10n={getEnL10nSync()}
        session={mockedSession}
        nonce=""
        monthlySubscriptionUrl=""
        yearlySubscriptionUrl=""
      >
        <DashboardEl
          user={user}
          userBreaches={breaches}
          userScanData={scanData}
          isEligibleForPremium={canSubscribeToPremium({
            user,
            countryCode: props.countryCode,
          })}
          isEligibleForFreeScan={props.countryCode === "us" && !scanData.scan}
          enabledFeatureFlags={["FreeBrokerScan", "PremiumBrokerRemoval"]}
          monthlySubscriptionUrl={""}
          yearlySubscriptionUrl={""}
          scanCount={scanCount}
        />
      </Shell>
    </CountryCodeProvider>
  );
};

const meta: Meta<typeof DashboardWrapper> = {
  title: "Pages/Dashboard",
  component: DashboardWrapper,
  argTypes: {
    brokers: {
      options: Object.keys(brokerOptions),
      description: "Scan results",
      control: {
        type: "radio",
        labels: brokerOptions,
      },
    },
    breaches: {
      options: Object.keys(breachOptions),
      control: {
        type: "radio",
        labels: breachOptions,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DashboardWrapper>;

export const DashboardNonUsNoBreaches: Story = {
  name: "Non-US user, with 0 breaches",
  args: {
    countryCode: "nl",
    breaches: "empty",
  },
};

export const DashboardNonUsUnresolvedBreaches: Story = {
  name: "Non-US user, with unresolved breaches",
  args: {
    countryCode: "nl",
    breaches: "unresolved",
  },
};

export const DashboardNonUsResolvedBreaches: Story = {
  name: "Non-US user, with all breaches resolved",
  args: {
    countryCode: "nl",
    breaches: "resolved",
  },
};

export const DashboardUsNoPremiumNoScanNoBreaches: Story = {
  name: "US user, without Premium, without scan, with 0 breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "empty",
    brokers: "no-scan",
  },
};

export const DashboardUsNoPremiumNoScanUnresolvedBreaches: Story = {
  name: "US user, without Premium, without scan, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "unresolved",
    brokers: "no-scan",
  },
};

export const DashboardUsNoPremiumNoScanResolvedBreaches: Story = {
  name: "US user, without Premium, without scan, with all breaches resolved",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "resolved",
    brokers: "no-scan",
  },
};

export const DashboardUsNoPremiumEmptyScanNoBreaches: Story = {
  name: "US user, without Premium, with 0 scan results, with 0 breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "empty",
    brokers: "empty",
  },
};

export const DashboardUsNoPremiumEmptyScanUnresolvedBreaches: Story = {
  name: "US user, without Premium, with 0 scan results, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "unresolved",
    brokers: "empty",
  },
};

export const DashboardUsNoPremiumEmptyScanResolvedBreaches: Story = {
  name: "US user, without Premium, with 0 scan results, with all breaches resolved",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "resolved",
    brokers: "empty",
  },
};

export const DashboardUsNoPremiumUnresolvedScanNoBreaches: Story = {
  name: "US user, without Premium, with unresolved scan results, with 0 breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "empty",
    brokers: "unresolved",
  },
};

export const DashboardUsNoPremiumUnresolvedScanUnresolvedBreaches: Story = {
  name: "US user, without Premium, with unresolved scan results, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "unresolved",
    brokers: "unresolved",
  },
};

export const DashboardUsNoPremiumUnresolvedScanResolvedBreaches: Story = {
  name: "US user, without Premium, with unresolved scan results, with all breaches resolved",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "resolved",
    brokers: "unresolved",
  },
};

export const DashboardUsNoPremiumResolvedScanNoBreaches: Story = {
  name: "US user, without Premium, with all scan results resolved, with 0 breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "empty",
    brokers: "resolved",
  },
};

export const DashboardUsNoPremiumResolvedScanUnresolvedBreaches: Story = {
  name: "US user, without Premium, with all scan results resolved, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "unresolved",
    brokers: "resolved",
  },
};

export const DashboardUsNoPremiumResolvedScanResolvedBreaches: Story = {
  name: "US user, without Premium, with all scan results resolved, with all breaches resolved",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "resolved",
    brokers: "resolved",
  },
};

export const DashboardUsPremiumEmptyScanNoBreaches: Story = {
  name: "US user, with Premium, with 0 scan results, with 0 breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "empty",
    brokers: "empty",
  },
};

export const DashboardUsPremiumEmptyScanUnresolvedBreaches: Story = {
  name: "US user, with Premium, with 0 scan results, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "unresolved",
    brokers: "empty",
  },
};

export const DashboardUsPremiumEmptyScanResolvedBreaches: Story = {
  name: "US user, with Premium, with 0 scan results, with all breaches resolved",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "resolved",
    brokers: "empty",
  },
};

export const DashboardUsPremiumUnresolvedScanNoBreaches: Story = {
  name: "US user, with Premium, with unresolved scan results, with 0 breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "empty",
    brokers: "unresolved",
  },
};

export const DashboardUsPremiumUnresolvedScanUnresolvedBreaches: Story = {
  name: "US user, with Premium, with unresolved scan results, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "unresolved",
    brokers: "unresolved",
  },
};

export const DashboardUsPremiumUnresolvedScanResolvedBreaches: Story = {
  name: "US user, with Premium, with unresolved scan results, with all breaches resolved",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "resolved",
    brokers: "unresolved",
  },
};

export const DashboardUsPremiumResolvedScanNoBreaches: Story = {
  name: "US user, with Premium, with all scan results resolved, with 0 breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "empty",
    brokers: "resolved",
  },
};

export const DashboardUsPremiumResolvedScanUnresolvedBreaches: Story = {
  name: "US user, with Premium, with all scan results resolved, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "unresolved",
    brokers: "resolved",
  },
};

export const DashboardUsPremiumResolvedScanResolvedBreaches: Story = {
  name: "US user, with Premium, with all scan results resolved, with all breaches resolved",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "resolved",
    brokers: "resolved",
  },
};

export const DashboardUsNoPremiumScanInProgressNoBreaches: Story = {
  name: "US user, without Premium, scan in progress, with no breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "empty",
    brokers: "scan-in-progress",
  },
};

export const DashboardUsNoPremiumScanInProgressUnresolvedBreaches: Story = {
  name: "US user, without Premium, scan in progress, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "unresolved",
    brokers: "scan-in-progress",
  },
};

export const DashboardUsNoPremiumScanInProgressResolvedBreaches: Story = {
  name: "US user, without Premium, scan in progress, with resolved breaches",
  args: {
    countryCode: "us",
    premium: false,
    breaches: "resolved",
    brokers: "scan-in-progress",
  },
};

export const DashboardUsPremiumScanInProgressNoBreaches: Story = {
  name: "US user, with Premium, scan in progress, with no breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "empty",
    brokers: "scan-in-progress",
  },
};

export const DashboardUsPremiumScanInProgressUnresolvedBreaches: Story = {
  name: "US user, with Premium, scan in progress, with unresolved breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "unresolved",
    brokers: "scan-in-progress",
  },
};

export const DashboardUsPremiumScanInProgressResolvedBreaches: Story = {
  name: "US user, with Premium, scan in progress, with resolved breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "resolved",
    brokers: "scan-in-progress",
  },
};

export const DashboardInvalidPremiumUserNoScanResolvedBreaches: Story = {
  name: "Invalid state: US user, with Premium, with no scan, with resolved breaches",
  args: {
    countryCode: "us",
    premium: true,
    breaches: "resolved",
    brokers: "no-scan",
  },
};
