import type { IconName } from "@/components/ui/Icon";
import Icon from "@/components/ui/Icon";
import { COLORS } from "@/constants/colors";
import type { StudyFile } from "./homeContent";

interface FileActionLinkProps {
  href: string;
  icon: IconName;
  label: string;
  opensInNewTab?: boolean;
}

function FileActionLink({ href, icon, label, opensInNewTab = false }: FileActionLinkProps) {
  return (
    <a
      href={href}
      target={opensInNewTab ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="d-flex align-items-center gap-1 text-decoration-none"
      style={{ color: COLORS.info }}
    >
      <Icon name={icon} size={14} /> {label}
    </a>
  );
}

interface StudyFileCardProps {
  file: StudyFile;
}

/** One downloadable file of the study, with "Open" and "Download" links. */
export default function StudyFileCard({ file }: StudyFileCardProps) {
  const { name, fileType, description, viewUrl, downloadUrl } = file;

  return (
    <div
      className="h-100 bg-white rounded p-3 d-flex align-items-start gap-3"
      style={{ border: `1px solid ${COLORS.gray200}` }}
    >
      <Icon name="file" size={22} color={COLORS.gray500} className="flex-shrink-0" />

      <div className="flex-grow-1">
        <div className="d-flex align-items-baseline justify-content-between gap-2">
          <span className="fw-semibold">{name}</span>
          <span className="font-monospace small text-nowrap" style={{ color: COLORS.gray400 }}>
            {fileType}
          </span>
        </div>

        <div className="small mt-1" style={{ color: COLORS.gray500 }}>
          {description}
        </div>

        <div className="d-flex align-items-center gap-3 fw-semibold small mt-2">
          <FileActionLink href={viewUrl} icon="externalLink" label="Open" opensInNewTab />
          <FileActionLink href={downloadUrl} icon="download" label="Download" />
        </div>
      </div>
    </div>
  );
}
