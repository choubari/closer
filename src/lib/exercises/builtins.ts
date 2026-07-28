import type { Exercise } from "./types";
import saas from "./saas";
import agency from "./agency";
import recruiting from "./recruiting";
import realestate from "./realestate";
import fundamentals from "./generic";

// The generic exercises shipped in the repo. Used to seed the database on first
// boot (attributed to the admin user). Private/domain packs are never included.
export const BUILTIN_EXERCISES: Exercise[] = [
  saas,
  agency,
  recruiting,
  realestate,
  fundamentals,
].flat();
