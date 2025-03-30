
import { ClientType, ClientTypeDetail } from "@/types/clientTypes";
import { observatoryDetails } from "./observatory";
import { researcherDetails } from "./researcher";
import { politicianDetails } from "./politician";
import { institutionDetails } from "./institution";
import { journalistDetails } from "./journalist";
import { pressDetails } from "./press";

export const clientTypeDetails: Record<ClientType, ClientTypeDetail> = {
  observatory: observatoryDetails,
  researcher: researcherDetails,
  politician: politicianDetails,
  institution: institutionDetails,
  journalist: journalistDetails,
  press: pressDetails
};
