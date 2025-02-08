import { Stack, TextInput, PasswordInput, Title, Group } from "@mantine/core";

import { defaultBorderColor } from "~utils/sx";
import { getSettings, setSettings } from "~storage/settings";
import { useAtomValue } from "jotai";
import { settingsAtom } from "~popup/states/atoms";


export const CloudPage = () => {

 const settings = useAtomValue(settingsAtom);
  return (
    <Stack
      h="100%"
      spacing={0}
      sx={(theme) => ({
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: defaultBorderColor(theme),
        borderRadius: theme.radius.sm,
      })}
    >
      <Group mb={5} spacing="sm" noWrap px="sm">
        <Stack spacing="xs" p="xl">
          <Title order={4}>CloudSync</Title>
          <TextInput label="url" placeholder="https://" value={settings.cloudUrl} onChange={(e) => e && setSettings({...settings, cloudUrl: e.currentTarget.value})} />
          <PasswordInput
           value={settings.cloudSk}
           onChange={(e) => e && setSettings({...settings, cloudSk: e.currentTarget.value})}
           placeholder=""
           label="Password"
          />
        </Stack>
      </Group>
    </Stack>
  );
};
