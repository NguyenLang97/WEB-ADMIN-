import './ProfileProduct.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import List from '../../components/table/Table'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProfileUser = () => {
    const navigate = useNavigate()
    interface DataDefault {
        img: string
        title: string
        file: string
        description: string
        category: string
        price: string
        total: string
    }

    // let data: Partial<DataDefault> = {};
    let initialData: DataDefault = {
        img: '',
        title: '',
        file: '',
        description: '',
        category: '',
        price: '',
        total: '',
    }

    const [data, setData] = useState(initialData)
    const { productId } = useParams()
    const docRef = doc(db, 'products', productId as string)
    useEffect(() => {
        const docSnap = async () => {
            await getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    console.log('Document data:', docSnap.data())
                    setData({ ...docSnap.data() } as DataDefault)
                } else {
                    console.log('No such document!')
                }
            })
        }
        docSnap()
    }, [])

    const handleEditUser = (id : any) => {
        console.log(id);
        navigate('/users/edit', { state: id})
    }
    

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <div className="wrap-itemImg">
                                <img src={data.img} alt="" className="itemImg" />
                            </div>
                            <div className="details">
                                <h1 className="itemTitle">{data.title}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Category:</span>
                                    <span className="itemValue">{data.category}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Description:</span>
                                    <span className="itemValue">{data.description}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Price:</span>
                                    <span className="itemValue">{data.price}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Total:</span>
                                    <span className="itemValue">{data.total}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="editButton" onClick={() => handleEditUser(productId)}>
                        Edit
                    </div>
                    {/* <div className="right">
                        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                    </div> */}
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    )
}

export default ProfileUser
