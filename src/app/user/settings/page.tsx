'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { KeyRound, UserX } from 'lucide-react';
import ChangePasswordDialog from './ChangePasswordDialog';
import DeleteAccountDialog from './DeleteAccountDialog';

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">계정 설정</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-muted-foreground" />
              <CardTitle>비밀번호 변경</CardTitle>
            </div>
            <CardDescription>
              안전한 계정 관리를 위해 비밀번호를 변경할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordDialog>
              <ChangePasswordDialog.Trigger asChild>
                <Button className="w-fit">비밀번호 변경</Button>
              </ChangePasswordDialog.Trigger>
            </ChangePasswordDialog>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">계정 삭제</CardTitle>
            </div>
            <CardDescription className="text-destructive/90">
              계정을 삭제하면 정보가 영구적으로 삭제돼요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DeleteAccountDialog>
              <DeleteAccountDialog.Trigger asChild>
                <Button variant="destructive" className="w-fit">
                  계정 삭제
                </Button>
              </DeleteAccountDialog.Trigger>
            </DeleteAccountDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
