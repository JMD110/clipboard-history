import { ActionIcon } from "@mantine/core";
import { IconCloudShare } from '@tabler/icons-react';
import { useAtomValue } from "jotai";
import { settingsAtom } from "~popup/states/atoms";
import { getEntries } from "~utils/storage";

interface Props {
  entryId: string;
}

export const EntryCloudSyncAction = ({ entryId}: Props) => {
  const settings = useAtomValue(settingsAtom);
  const cloudSyncEntries = async (entryId: string) => {
    const entries = await getEntries();
    const entry = entries.find(
      (entry) => entry.id === entryId,
    );
    await fetch(settings.cloudUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-token': settings.cloudSk,
        'accept': 'application/json'
      },
      body: JSON.stringify(entry)
    });
  };
  return (
    <ActionIcon
      sx={(theme) => ({
        color: theme.colors.gray[5],
      })}
      onClick={(e) => {
        e.stopPropagation();
        if (settings.cloudUrl) {
          cloudSyncEntries(entryId);
        }
      }}
    >
      <IconCloudShare size="1rem" />
    </ActionIcon>
  );
};
