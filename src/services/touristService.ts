import { TouristRepository } from "../repositories/touristRepository";
import { PasswordUtil } from "../utils/password";
import { CreateTouristDto } from "../types";

export class TouristService {
  private touristRepository: TouristRepository;

  constructor() {
    this.touristRepository = new TouristRepository();
  }

  async createTourist(data: CreateTouristDto) {
    const existingTourist = await this.touristRepository.findByUsername(
      data.username
    );
    if (existingTourist) {
      throw new Error("Username already exists");
    }

    const existingEmail = await this.touristRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
    const hashedPassword = await PasswordUtil.hash(data.password);
    const tourist = await this.touristRepository.create({
      ...data,
      password: hashedPassword,
      dateOfBirth,
    });

    const { password, ...touristWithoutPassword } = tourist;
    return touristWithoutPassword;
  }

  async getAllTourists() {
    return this.touristRepository.findAll();
  }

  async getTouristById(id: string) {
    const tourist = await this.touristRepository.findById(id);
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    const { password, ...touristWithoutPassword } = tourist;
    return touristWithoutPassword;
  }

  async updateTourist(id: string, data: Partial<CreateTouristDto>) {
    const tourist = await this.touristRepository.findById(id);
    if (!tourist) {
      throw new Error("Tourist not found");
    }

    if (data.password) {
      data.password = await PasswordUtil.hash(data.password);
    }

    if (data.dateOfBirth) {
      data.dateOfBirth = new Date(data.dateOfBirth);
    }

    const updatedTourist = await this.touristRepository.update(id, data);
    const { password, ...touristWithoutPassword } = updatedTourist;
    return touristWithoutPassword;
  }

  async deleteTourist(id: string) {
    const tourist = await this.touristRepository.findById(id);
    if (!tourist) {
      throw new Error("Tourist not found");
    }

    return this.touristRepository.delete(id);
  }
}
