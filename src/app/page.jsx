'use client';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useEffect } from 'react';

import UploadFiles from '@/components/UploadFiles';
import ManifestEditor from '@/components/ManifestEditor';
import DownloadFiles from '@/components/DownloadFiles';





export default function Home() {

	// const { user, logout } = useUser();
	// const pathname = usePathname();
	// const router = useRouter();

	// useEffect(() => {
	//     if (!user) return;

	//     const isQRPage = pathname.startsWith('/protect/qr/');
	//     const isAdmin = user.roles.includes('admin');

	//     if (!isAdmin && !isQRPage && pathname !== '/protect/state') {
	//       router.replace('/protect/state');
	//     }
	// }, [user, pathname, router]);

	//   // Пока нет данных о пользователе — ничего не рендерим
	// if (!user) return null;

	// const isAdmin = user.roles.includes('admin');

	return(
		<>
			<DownloadFiles />
		</>
		
	)
}

