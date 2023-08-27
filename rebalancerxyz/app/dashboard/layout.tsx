import { ReactNode } from 'react'

import Image from 'next/image'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { DashboardFooter } from '@/components/layout/dashboard-footer'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { MenuDashboardSidebar } from '@/components/layout/menu-dashboard-sidebar'
import { UserDropdown } from '@/components/layout/user-dropdown'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsDesktop } from '@/components/shared/is-desktop'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsMobile } from '@/components/shared/is-mobile'
import { LinkComponent } from '@/components/shared/link-component'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/site'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-screen flex-col lg:grid lg:grid-cols-12">
        <div className="col-span-12 flex flex-col bg-slate-50 shadow-md dark:bg-slate-800 lg:col-span-2 lg:pb-8">
          <IsMobile>
            <div className="flex p-4">
              <LinkComponent className="flex flex-1 items-center " href="/">
                <IsLightTheme>
                  <Image alt="Logo" height={32} src="/logo-dark.png" width={32} />
                </IsLightTheme>
                <IsDarkTheme>
                  <Image alt="Logo" height={32} src="/logo-white.png" width={32} />
                </IsDarkTheme>
              </LinkComponent>
              <div className="">
                <UserDropdown />
              </div>
            </div>
          </IsMobile>
          <IsDesktop>
            <div className="flex p-4 py-6">
              <LinkComponent className="flex items-center" href="/">
                <Image alt="Logo" height={256} src="https://raw.githubusercontent.com/asulpizi-neu/pictures/cb2b0832c6d0669bdcb3afdd0db0161e18a6d71d/logo-white.png" width={256} />
              </LinkComponent>
            </div>
            <div className="flex justify-center">
              <LinkComponent className="btn btn-pill bg-gradient-button px-2 hover:scale-105 hover:shadow-lg mt-4" href="https://staking.benqi.fi/stake">
                Stake with Benqi
              </LinkComponent>
            </div>
            <div className="flex-1 px-8 py-5">
              <MenuDashboardSidebar className="mt-4 flex-1" />
            </div>
            <div className="px-8">
              <WalletConnect />
            </div>
            <hr className="my-4 opacity-25" />
            <DashboardFooter className="px-8 " />
          </IsDesktop>
        </div>
        <div className="relative col-span-12 flex max-h-[100vh] flex-1 flex-col lg:col-span-10">
          <DashboardHeader className="bg-slate-100 py-3 shadow-md dark:bg-slate-700" />
          <main className="w-full flex-1 overflow-auto">{children}</main>
        </div>
      </div>
      <Toaster />
    </>
  )
}
