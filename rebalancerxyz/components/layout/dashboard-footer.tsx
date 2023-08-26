import { HTMLAttributes } from 'react'

import { FaGithub, FaTwitter } from 'react-icons/fa'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { LinkComponent } from '../shared/link-component'

export function DashboardFooter({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const classes = cn(className, 'flex flex-col justify-center')

  return (
    <footer className={classes} {...props}>
      <h3 className="text-sm font-semibold">{siteConfig.title}</h3>
      <a className="link my-2 text-xs" href="https://districtlabs.com/" rel="noreferrer" target={'_blank'}>
      </a>
      <div className="mt-2 flex items-center">
        
        <div className="mx-2" />
        
      </div>
    </footer>
  )
}
