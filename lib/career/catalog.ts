import type { DepartmentCatalogEntry, ProfessionCatalogEntry } from "@/lib/careerMatch/types";
import departmentsJson from "@/data/careers/departments.json";
import professionsJson from "@/data/careers/professions.json";

export const PROFESSION_CATALOG = professionsJson as ProfessionCatalogEntry[];
export const DEPARTMENT_CATALOG = departmentsJson as DepartmentCatalogEntry[];
