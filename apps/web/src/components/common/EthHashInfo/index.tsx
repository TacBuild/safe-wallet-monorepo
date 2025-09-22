import { useChain } from '@/hooks/useChains'
import { type ReactElement } from 'react'
import useAllAddressBooks from '@/hooks/useAllAddressBooks'
import useChainId from '@/hooks/useChainId'
import { getBlockExplorerLink } from '@safe-global/utils/utils/chains'
import SrcEthHashInfo, { type EthHashInfoProps } from './SrcEthHashInfo'

const EthHashInfo = ({
  showName = true,
  avatarSize = 40,
  ...props
}: EthHashInfoProps & { showName?: boolean }): ReactElement => {
  const currentChainId = useChainId()
  const chain = useChain(props.chainId || currentChainId)
  const addressBooks = useAllAddressBooks()
  const link = chain && props.hasExplorer ? getBlockExplorerLink(chain, props.address) : undefined
  const addressBookName = chain ? addressBooks?.[chain.chainId]?.[props.address] : undefined
  const name = showName ? addressBookName || props.name : undefined

  return (
    <SrcEthHashInfo
      // prefix={chain?.shortName}
      // copyPrefix={settings.shortName.copy}
      {...props}
      showPrefix={false}
      name={name}
      isAddressBookName={!!addressBookName}
      customAvatar={props.customAvatar}
      ExplorerButtonProps={{ title: link?.title || '', href: link?.href || '' }}
      avatarSize={avatarSize}
    >
      {props.children}
    </SrcEthHashInfo>
  )
}

export default EthHashInfo
